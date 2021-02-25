<?php
class ModelLocalisationUnit extends Model {
	public function addUnit($data) {
		$this->db->query("INSERT INTO " . DB_PREFIX . "unit SET unit_group_id = '0'");

		$unit_id = $this->db->getLastId();

		foreach ($data['unit_description'] as $language_id => $value) {
			$this->db->query("INSERT INTO " . DB_PREFIX . "unit_description SET unit_id = '" . (int)$unit_id . "', language_id = '" . (int)$language_id . "', title = '" . $this->db->escape($value['title']) . "', unit = '" . $this->db->escape($value['unit']) . "'");
		}

		$this->cache->delete('unit');
		
		return $unit_id;
	}

	public function editUnit($unit_id, $data) {
		//$this->db->query("UPDATE " . DB_PREFIX . " WHERE unit_id = '" . (int)$unit_id . "'");		

		foreach ($data['unit_description'] as $language_id => $value) {
			$this->db->query("UPDATE " . DB_PREFIX . "unit_description SET title = '" . $this->db->escape($value['title']) . "', unit = '" . $this->db->escape($value['unit']) . "' WHERE unit_id = '" . (int)$unit_id . "' AND language_id = '" . (int)$language_id . "'");
		}

		$this->cache->delete('unit');
	}

	public function deleteUnit($unit_id) {
		$this->db->query("DELETE FROM " . DB_PREFIX . "unit WHERE unit_id = '" . (int)$unit_id . "'");
		$this->db->query("DELETE FROM " . DB_PREFIX . "unit_description WHERE unit_id = '" . (int)$unit_id . "'");
		$this->db->query("UPDATE " . DB_PREFIX . "attribute  SET unit_id = '' WHERE unit_id = '" . (int)$unit_id . "'");

		$this->cache->delete('unit');
	}

	public function getUnit($unit_id, $language_id) {
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "unit u LEFT JOIN " . DB_PREFIX . "unit_description ud ON (u.unit_id = ud.unit_id) WHERE u.unit_id = '" . (int)$unit_id . "' AND ud.language_id = '" . (int)$language_id . "'");

		return $query->row;
	}

	public function getUnits($data) {

		if (isset($data['unit_id'])) {
			$sql = " WHERE u.unit_id = '" . (int)$data['unit_id'] . "' ORDER BY ud.language_id ASC";
		}

		if (isset($data['language_id'])) {
			$sql = " WHERE ud.language_id = '" . (int)$data['language_id'] . "' ORDER BY ud.title ASC";
		}
		
		$query = $this->db->query("SELECT * FROM " . DB_PREFIX . "unit u LEFT JOIN " . DB_PREFIX . "unit_description ud ON (u.unit_id = ud.unit_id)" . $sql);
	
		return $query->rows;
	}
		
		

	public function getTotalUnits() {
		$query = $this->db->query("SELECT COUNT(*) AS total FROM " . DB_PREFIX . "unit");

		return $query->row['total'];
	}
}