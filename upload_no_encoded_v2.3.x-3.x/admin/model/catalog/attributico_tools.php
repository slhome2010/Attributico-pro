<?php

require_once(DIR_SYSTEM . 'library/attributico/array_column.php');

class ModelCatalogAttributicoTools extends Model
{

    public function deleteEmptyValues()
    {
        $this->cache->delete('attributico');
        $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute WHERE TRIM(text) LIKE ''");
        return $this->db->countAffected();
    }

    public function defragmentation($basetable, $field)
    {
        $this->cache->delete('attributico');
        $schema = array();
        $this->db->query("DROP TABLE IF EXISTS " . DB_PREFIX . $basetable . "_relation");

        $query = $this->db->query("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA='" . DB_DATABASE . "' AND COLUMN_NAME ='" . $field . "'");
        foreach ($query->rows as $row) {
           // if (!in_array(DB_PREFIX . $basetable, $row)) {
                $schema[] = $row;
           // }
        }

        $this->db->query("CREATE TABLE " . DB_PREFIX . $basetable . "_relation (`new_id` INTEGER(11) NOT NULL AUTO_INCREMENT, " . $field .
            " INTEGER NOT NULL, PRIMARY KEY (`new_id`))");
        $this->db->query("INSERT INTO " . DB_PREFIX . $basetable . "_relation (" . $field . ") SELECT " . $field . " FROM " . DB_PREFIX . $basetable);
        $count_of_defrag = $this->db->countAffected();

        foreach ($schema as $table) {
            $this->db->query("UPDATE " . $table['TABLE_NAME'] . " t, " . DB_PREFIX . $basetable . "_relation tr SET t." . $field . " = tr.new_id
                            WHERE t." . $field . " = tr." . $field);
        }

        //$this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " MODIFY " . $field . " INT(11)");
        //$this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " DROP PRIMARY KEY");
        //$this->db->query("UPDATE " . DB_PREFIX . $basetable . " SET " . $field . "='0'");
        //$this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " AUTO_INCREMENT=0");
        //$this->db->query("ALTER TABLE " . DB_PREFIX . $basetable . " MODIFY " . $field . " INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY");

        return $count_of_defrag;
    }

    public function sorting() {
        set_time_limit(600);
        $this->db->query("SET @num :=0");
        $this->db->query("UPDATE " . DB_PREFIX . "attribute a INNER JOIN (SELECT t1.attribute_id FROM  " . DB_PREFIX . "attribute t1 LEFT JOIN  " . DB_PREFIX . "attribute_group t2 ON t1.attribute_group_id = t2.attribute_group_id ORDER BY t2.sort_order ASC, t1.sort_order ASC) AS g ON a.attribute_id = g.attribute_id SET a.sort_order = @num :=@num+1");
        return $this->db->countAffected();
    }

    public function scavengery()
    {
        $categoryAttributes = $this->db->query("SELECT * FROM " . DB_PREFIX . "category_attribute");
        $count_of_scavengery = 0;
        foreach ($categoryAttributes->rows as $attribute) {
            $attr = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute WHERE `attribute_id` = '" . (int) $attribute['attribute_id'] . "'");
            if (!$attr->row) {
                $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $count_of_scavengery++;
            }
        }
        return $count_of_scavengery;
    }

    public function detached($attribute_group_id = 0, $attributes = array())
    {
        set_time_limit(600);
        $this->cache->delete('attributico');
        $sql_group = $attribute_group_id !== 0 ? " WHERE attribute_group_id =" . (int) $attribute_group_id : "";
        $sql_attributes = $attributes ? " AND attribute_id IN (" . implode(",", $attributes) . ")" : "";
        $all_attributes = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute" . $sql_group . $sql_attributes);
        $count_of_detached = 0;

        foreach ($all_attributes->rows as $attribute) {
            $attr = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE `attribute_id` = '" . (int) $attribute['attribute_id'] . "'");
            if (!$attr->row) {
                $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $this->db->query("DELETE FROM " . DB_PREFIX . "attribute WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                $count_of_detached++;
            }
        }
        return $count_of_detached;
    }

    private function concateValues($val1, $val2, $splitter)
    {
        $text = trim($val1);
        $splitter_add = $text !== '' && $val2 !== '' ? $splitter : '';
        $text .= $splitter_add . trim($val2);
        $elements = explode($splitter, $text);
        $values = array_unique($elements);
        array_multisort($values);
        $newtext = implode($splitter, $values);
        return $newtext;
    }

    private function getHoldkeys($attribute_group_id)
    {
        // Поиск образцов дубликатов имен в данной группе, id-шники берутся от первого по ходу атрибута        
        $holdkeys = $this->db->query("SELECT MIN(ad.attribute_id) AS attribute_id, ad.language_id, ad.name, ad.duty, count(*)
                FROM " . DB_PREFIX . "attribute_description ad LEFT JOIN " . DB_PREFIX . "attribute a ON (a.attribute_id = ad.attribute_id)
                WHERE a.attribute_group_id = '" . (int) $attribute_group_id . "'  GROUP BY ad.language_id, ad.name HAVING count(*) > 1  ORDER BY attribute_id");
        return $holdkeys->rows;
    }

    private function getDuplicates($attribute_group_id)
    {
        $duplicates = $this->db->query("SELECT ad.* FROM " . DB_PREFIX . "attribute_description ad LEFT JOIN " . DB_PREFIX . "attribute a ON (a.attribute_id = ad.attribute_id) LEFT OUTER JOIN (SELECT MIN(ad1.attribute_id) AS id, ad1.language_id, ad1.name FROM " . DB_PREFIX . "attribute_description ad1 GROUP BY ad1.language_id, ad1.name) AS tmp ON ad.attribute_id = tmp.id WHERE tmp.id IS NULL AND a.attribute_group_id = '" . (int) $attribute_group_id . "'");

        return $duplicates->rows;
    }

    private function getProddups($lostkeys = array())
    {
        // Товары, в которых надо изменить attribute_id на образец
        if ($lostkeys) {
            $lostdups = $this->db->query("SELECT product_id, pa.attribute_id, pa.language_id, pa.text, ad2.name FROM  " . DB_PREFIX . "product_attribute pa LEFT JOIN " . DB_PREFIX . "attribute_description ad2 ON (pa.attribute_id = ad2.attribute_id AND pa.language_id = ad2.language_id) WHERE pa.attribute_id IN (" . implode(',', $lostkeys) . ") ORDER BY pa.product_id, pa.attribute_id, pa.language_id, ad2.name");
            return $lostdups->rows;
        } else {
            return array();
        }
    }

    public function deduplicate($attribute_group_id)
    {
        set_time_limit(600);
        $this->cache->delete('attributico');
        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';
        $holdkeys = $this->getHoldkeys($attribute_group_id);
        $duplicates = $this->getDuplicates($attribute_group_id);
        $proddups = $this->getProddups(array_unique(array_column($duplicates, 'attribute_id')));
        foreach ($holdkeys as $holdkey) {
            foreach ($proddups as $lostproduct) {
                // Проверим есть ли для этого товара уже образец. holdproduct - сохраняемый образец, lostproduct - удаляемый дубликат
                $holddups = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $lostproduct['product_id'] . "' AND attribute_id = '" . (int) $holdkey['attribute_id'] . "' AND language_id = '" . (int) $holdkey['language_id'] . "'");
                $holdproduct = $holddups->row;
                // Если уже есть, то дополним значения в образце 
                if ($holdproduct) {
                    $text = $this->concateValues($holdproduct['text'], $lostproduct['text'], $splitter);
                    //update remining
                    $this->db->query("UPDATE " . DB_PREFIX . "product_attribute SET text = '" . $this->db->escape($text) . "' WHERE product_id = '" . (int) $holdproduct['product_id'] . "' AND attribute_id = '" . (int) $holdproduct['attribute_id'] . "' AND language_id = '" . (int) $holdproduct['language_id'] . "'");
                    // И удалим дубликат товара 
                    $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute  WHERE product_id = '" . (int) $lostproduct['product_id'] .
                        "' AND attribute_id = '" . (int) $lostproduct['attribute_id'] . "' AND language_id = '" . (int) $lostproduct['language_id'] . "'");
                    $this->db->query("UPDATE IGNORE " . DB_PREFIX . "category_attribute SET attribute_id = '" . (int) $holdproduct['attribute_id'] . "' WHERE attribute_id = '" . (int) $lostproduct['attribute_id'] . "'");
                } else {
                    // Если образца нет, просто меняем ссылку на id-шник образца
                    $this->db->query("UPDATE IGNORE " . DB_PREFIX . "product_attribute SET attribute_id = '" . (int) $holdkey['attribute_id'] . "' WHERE product_id = '" . (int) $lostproduct['product_id'] . "' AND attribute_id = '" . (int) $lostproduct['attribute_id'] . "' AND language_id = '" . (int) $lostproduct['language_id'] . "'");

                    $this->db->query("UPDATE IGNORE " . DB_PREFIX . "category_attribute SET attribute_id = '" . (int) $holdkey['attribute_id'] . "' WHERE attribute_id = '" . (int) $lostproduct['attribute_id'] . "'");
                }
            }
        }
        // Чтоб не потерять дежурные допишем их из удаляемых в образцы
        foreach ($holdkeys as $holdkey) {
            foreach ($duplicates as $duplicate) {
                if ($duplicate['name'] === $holdkey['name'] && $duplicate['language_id'] === $holdkey['language_id'] && trim($duplicate['duty']) !== '') {
                    $duty = $this->concateValues($holdkey['duty'], $duplicate['duty'], $splitter);
                    $this->db->query("UPDATE " . DB_PREFIX . "attribute_description ad SET duty = '" . $duty . "' WHERE attribute_id = '" . (int) $holdkey['attribute_id'] . "' AND language_id = '" . (int) $holdkey['language_id'] . "'");
                }
            }
        }

        if ($duplicates) {
            $this->detached($attribute_group_id, array_unique(array_column($duplicates, 'attribute_id')));
        }

        return count($duplicates);
    }

    public function mergeAttribute($target_id, $source_id)
    {
        // in foreach
        $splitter = !($this->config->get('attributico_splitter') == '') ? $this->config->get('attributico_splitter') : '/';

        $source_products = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE attribute_id = '" . (int) $source_id . "'");
        foreach ($source_products->rows as $source_product) {
            $dups = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE product_id = '" . (int) $source_product['product_id'] . "' AND attribute_id = '" . (int) $target_id .
                "' AND language_id = '" . (int) $source_product['language_id'] . "'");
            $dup = $dups->row; // perfect potentional dublicate - to-be error of keys sql, change attribute_id impossible
            if ($dup) {
                $text = $this->concateValues($dup['text'], $source_product['text'], $splitter);
                //update remining
                $this->db->query("UPDATE " . DB_PREFIX . "product_attribute SET text = '" . $this->db->escape($text) . "' WHERE product_id = '" . (int) $dup['product_id'] .
                    "' AND attribute_id = '" . (int) $target_id . "' AND language_id = '" . (int) $dup['language_id'] . "'");
            } else {
                // this product not have in this attribute, then only change attribute_id
                $this->db->query("UPDATE IGNORE " . DB_PREFIX . "product_attribute SET attribute_id = '" . (int) $target_id . "' WHERE product_id = '" . (int) $source_product['product_id'] .
                    "' AND attribute_id = '" . (int) $source_id . "' AND language_id = '" . (int) $source_product['language_id'] . "'");
            }
            // delete old product references to source_id
            $this->db->query("DELETE FROM " . DB_PREFIX . "product_attribute  WHERE product_id = '" . (int) $source_product['product_id'] .
                "' AND attribute_id = '" . (int) $source_id . "' AND language_id = '" . (int) $source_product['language_id'] . "'");
        }
        // Concate duty
        $source_duties = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $source_id . "'");
        foreach ($source_duties->rows as $source_duty) {
            $target_duty = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $target_id . "'  AND language_id = '" . (int) $source_duty['language_id'] . "'");
            $duty = $this->concateValues($target_duty->row['duty'], $source_duty['duty'], $splitter);
            $this->db->query("UPDATE " . DB_PREFIX . "attribute_description ad SET duty = '" . $duty . "' WHERE attribute_id = '" . (int) $target_id . "' AND language_id = '" . (int) $source_duty['language_id'] . "'");
        }
        // kill source references in category
        $this->db->query("UPDATE IGNORE " . DB_PREFIX . "category_attribute SET attribute_id = '" . (int) $target_id . "' WHERE attribute_id = '" . (int) $source_id . "'");
        // delete source attribute
        $this->db->query("DELETE FROM " . DB_PREFIX . "category_attribute WHERE attribute_id = '" . (int) $source_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute WHERE attribute_id = '" . (int) $source_id . "'");
        $this->db->query("DELETE FROM " . DB_PREFIX . "attribute_description WHERE attribute_id = '" . (int) $source_id . "'");
        return;
    }

    public function createCategoryAttributes($categories = array())
    {
        // $this->cache->delete('attributico');
        if ($categories) {
            // pull out category attribute from products
            $this->db->query("INSERT IGNORE INTO " . DB_PREFIX . "category_attribute(category_id, attribute_id) (SELECT DISTINCT hptc.category_id, hpa.attribute_id FROM "
                . DB_PREFIX . "product_attribute hpa LEFT JOIN "
                . DB_PREFIX . "product_to_category hptc ON (hpa.product_id = hptc.product_id) WHERE hptc.category_id IN (" . implode(",", $categories) . ") AND hpa.attribute_id !='0' ORDER BY hptc.category_id) ");
        }
        return $this->db->countAffected();
    }

    public function addCategoryAttributesToProducts($category_id)
    {
        // in foreach
        set_time_limit(600);
        $method = $this->config->get('attributico_product_text');
        $count_affected = 0;
        $sql = '';
        /* Будут добавлены только записи с несовпадающими ключами. Поле Text не будет затронуто */
        $sql_not_change = "INSERT IGNORE INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id)
                      SELECT p.product_id, hca.attribute_id, hl.language_id FROM  " . DB_PREFIX . "product p
                      LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                      LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                      , " . DB_PREFIX . "language hl
                      WHERE p2c.category_id = '" . (int) $category_id . "'
                      ORDER BY p.product_id, hca.attribute_id";

        switch ($method) {
            case '1':    // text = ''
                $sql = "INSERT INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id, text)
                    SELECT p.product_id, hca.attribute_id, hl.language_id, '' FROM  " . DB_PREFIX . "product p
                    LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                    LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                    , " . DB_PREFIX . "language hl
                    WHERE p2c.category_id = '" . (int) $category_id . "'
                    ORDER BY p.product_id, hca.attribute_id
                    ON DUPLICATE KEY UPDATE text = ''";
                break;
            case '2': // text not write
                $sql = $sql_not_change;
                break;
            case '3':
                /* Во всех записях поле Text будет заменено на непустой Duty */
                $sql = "INSERT INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id, text)
                        SELECT p.product_id, hca.attribute_id, hl.language_id, had.duty FROM " . DB_PREFIX . "product p
                        LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                        LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                        LEFT JOIN " . DB_PREFIX . "attribute_description had ON (had.attribute_id = hca.attribute_id AND had.duty != '')
                        , " . DB_PREFIX . "language hl
                        WHERE p2c.category_id = '" . (int) $category_id . "' AND had.language_id = hl.language_id
                        ORDER BY p.product_id, hca.attribute_id
                        ON DUPLICATE KEY UPDATE text = had.duty";
                break;
            case '4':
                /* Сначала вставляем записи с несовпадающими ключами */
                $this->db->query($sql_not_change);
                $count_affected = $this->db->countAffected();
                /* Затем заменяем во всех записях Text если он пустой на Duty если оно не пустое */
                $sql = "INSERT INTO " . DB_PREFIX . "product_attribute(product_id, attribute_id, language_id, text)
                        SELECT p.product_id, hca.attribute_id, hl.language_id, had.duty FROM " . DB_PREFIX . "product p
                        LEFT JOIN " . DB_PREFIX . "product_to_category p2c ON (p.product_id = p2c.product_id)
                        LEFT JOIN " . DB_PREFIX . "category_attribute hca ON (hca.category_id = '" . (int) $category_id . "')
                        LEFT JOIN " . DB_PREFIX . "attribute_description had ON (had.attribute_id = hca.attribute_id AND had.duty != '')
                        , " . DB_PREFIX . "language hl, " . DB_PREFIX . "product_attribute hpa
                        WHERE p2c.category_id = '" . (int) $category_id . "' AND had.language_id = hl.language_id
                        AND hpa.product_id = p.product_id AND hpa.attribute_id = hca.attribute_id AND hpa.language_id = hl.language_id AND hpa.text = ''
                        ORDER BY p.product_id, hca.attribute_id
                        ON DUPLICATE KEY UPDATE text = had.duty";
                break;
        }

        if ($sql) {
            $this->db->query($sql);
        }

        return $count_affected ? $count_affected : $this->db->countAffected();
    }

    public function cloneLanguage($source_lng, $target_lng, $method, $node = [])
    {

        set_time_limit(600);
        $count_affected = new stdClass();
        $count_affected->attribute = 0;
        $count_affected->group = 0;
        $count_affected->value = 0;
        $count_affected->duty = 0;

        $this->cache->delete('attributico');

        // Attribute Group
        if ($node['group']) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_group_description WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $attribute_group) {
                $insert_query = "INSERT IGNORE INTO " . DB_PREFIX . "attribute_group_description SET attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "',
                                       language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute_group['name']) . "'";
                $overwrite_query = "INSERT INTO " . DB_PREFIX . "attribute_group_description SET attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "',
                                       language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute_group['name']) . "'
                                       ON DUPLICATE KEY UPDATE attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "',
                                       language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute_group['name']) . "'";
                switch ($method) {
                    case 'insert':
                        $this->db->query($insert_query);
                        break;
                    case 'overwrite':
                        $this->db->query($overwrite_query);
                        break;
                    case 'overifempty':
                        $has_already = $this->db->query("SELECT name FROM " . DB_PREFIX . "attribute_group_description WHERE language_id = '" . (int) $target_lng . "' AND attribute_group_id = '" . (int) $attribute_group['attribute_group_id'] . "'");
                        if (empty($has_already->row['name']) || trim($has_already->row['name']) === "") {
                            $this->db->query($overwrite_query);
                        }
                        break;
                    default:
                        break;
                }
                $count_affected->group += round($this->db->countAffected() / 2);
            }
        }

        // Attribute
        if ($node['attribute']) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $attribute) {
                $insert_query = "INSERT IGNORE INTO " . DB_PREFIX . "attribute_description SET attribute_id = '" . (int) $attribute['attribute_id'] . "',
                             language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute['name']) . "', duty = '" . $this->db->escape($attribute['duty']) . "'";
                $overwrite_query = "INSERT INTO " . DB_PREFIX . "attribute_description SET attribute_id = '" . (int) $attribute['attribute_id'] . "',
                             language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute['name']) . "', duty = '" . $this->db->escape($attribute['duty']) . "'
                             ON DUPLICATE KEY UPDATE attribute_id = '" . (int) $attribute['attribute_id'] . "',
                             language_id = '" . (int) $target_lng . "', name = '" . $this->db->escape($attribute['name']) . "', duty = '" . $this->db->escape($attribute['duty']) . "'";

                switch ($method) {
                    case 'insert':
                        $this->db->query($insert_query);
                        break;
                    case 'overwrite':
                        $this->db->query($overwrite_query);
                        break;
                    case 'overifempty':
                        $has_already = $this->db->query("SELECT name FROM " . DB_PREFIX . "attribute_description WHERE language_id = '" . (int) $target_lng . "' AND attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                        if (empty($has_already->row['name']) || trim($has_already->row['name']) === "") {
                            $this->db->query($overwrite_query);
                        }
                        break;
                    default:
                        break;
                }
                $count_affected->attribute += round($this->db->countAffected() / 2);
            }
        }

        // Product Attribute = value
        if ($node['value']) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "product_attribute WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $product_attribute) {
                $insert_query = "INSERT IGNORE INTO " . DB_PREFIX . "product_attribute SET product_id = '" . (int) $product_attribute['product_id'] . "', attribute_id = '" . (int) $product_attribute['attribute_id'] . "',
                        language_id = '" . (int) $target_lng . "', text = '" . $this->db->escape($product_attribute['text']) . "'";
                $overwrite_query = "INSERT INTO " . DB_PREFIX . "product_attribute SET product_id = '" . (int) $product_attribute['product_id'] . "', attribute_id = '" . (int) $product_attribute['attribute_id'] . "',
                                       language_id = '" . (int) $target_lng . "', text = '" . $this->db->escape($product_attribute['text']) . "'
                                       ON DUPLICATE KEY UPDATE product_id = '" . (int) $product_attribute['product_id'] . "', attribute_id = '" . (int) $product_attribute['attribute_id'] . "',
                                       language_id = '" . (int) $target_lng . "', text = '" . $this->db->escape($product_attribute['text']) . "'";
                switch ($method) {
                    case 'insert':
                        $this->db->query($insert_query);
                        break;
                    case 'overwrite':
                        $this->db->query($overwrite_query);
                        break;
                    case 'overifempty':
                        $has_already = $this->db->query("SELECT text FROM " . DB_PREFIX . "product_attribute WHERE language_id = '" . (int) $target_lng . "' AND attribute_id = '" . (int) $product_attribute['attribute_id'] . "' AND product_id = '" . (int) $product_attribute['product_id'] . "'");
                        if (empty($has_already->row['text']) || trim($has_already->row['text']) === "") {
                            $this->db->query($overwrite_query);
                        }
                        break;
                    default:
                        break;
                }
                $count_affected->value += round($this->db->countAffected() / 2);
            }
        }

        // Duty
        if ($node['duty']) {
            $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "attribute_description WHERE language_id = '" . (int) $source_lng . "'");

            foreach ($query->rows as $attribute) {
                $insert_query = "";
                $overwrite_query = "UPDATE " . DB_PREFIX . "attribute_description SET duty = '" . $this->db->escape($attribute['duty']) . "'
                WHERE attribute_id = '" . (int) $attribute['attribute_id'] . "' AND language_id = '" . (int) $target_lng . "'";

                switch ($method) {
                    case 'insert':
                        break;
                    case 'overwrite':
                        $this->db->query($overwrite_query);
                        break;
                    case 'overifempty':
                        $has_already = $this->db->query("SELECT duty FROM " . DB_PREFIX . "attribute_description WHERE language_id = '" . (int) $target_lng . "' AND attribute_id = '" . (int) $attribute['attribute_id'] . "'");
                        if (empty($has_already->row['duty']) || trim($has_already->row['duty']) === "") {
                            $this->db->query($overwrite_query);
                        }
                        break;
                    default:
                        break;
                }
                $count_affected->duty += round($this->db->countAffected() / 2);
            }
        }

        return $count_affected;
    }
}
