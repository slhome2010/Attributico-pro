<?php
class ControllerLocalisationUnit extends Controller
{
	private $error = array();

	public function index()
	{
		/* $this->load->language('localisation/unit');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('localisation/unit');

		$this->getList(); */
	}

	public function add()
	{
		/* $this->load->language('localisation/unit');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('localisation/unit');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_localisation_unit->addUnit($this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}

			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('localisation/unit', 'token=' . $this->session->data['token'] . $url, true));
		}

		$this->getForm(); */
	}

	public function edit()
	{
		/* $this->load->language('localisation/unit');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('localisation/unit');

		if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validateForm()) {
			$this->model_localisation_unit->editUnit($this->request->get['unit_id'], $this->request->post);

			$this->session->data['success'] = $this->language->get('text_success');

			$url = '';

			if (isset($this->request->get['sort'])) {
				$url .= '&sort=' . $this->request->get['sort'];
			}

			if (isset($this->request->get['order'])) {
				$url .= '&order=' . $this->request->get['order'];
			}

			if (isset($this->request->get['page'])) {
				$url .= '&page=' . $this->request->get['page'];
			}

			$this->response->redirect($this->url->link('localisation/unit', 'token=' . $this->session->data['token'] . $url, true));
		}

		$this->getForm(); */
	}

	public function delete()
	{
		$this->load->model('localisation/unit');

		if (isset($this->request->get['unit_id']) && $this->request->get['unit_id']) {
			$unit_id = $this->request->get['unit_id'];
			$this->model_localisation_unit->deleteUnit($unit_id);
		}

		return;
	}

	public function getUnitList($language_id)
	{
	}

	protected function getForm()
	{		
        $unit_id = isset($this->request->get['unit_id']) ? $this->request->get['unit_id'] : 0;        
        $config = [];
       
		$this->load->model('localisation/unit');
        $units = $this->model_localisation_unit->getUnits(['unit_id' => $unit_id]);

		$this->load->language('localisation/unit');       
        
        $config = [
            'title' => $this->language->get('form_title'),
            'elements' => [
                
                
                [
                    'rowname' => 'units',
                    'cols' => [
                        [
							'width' => '7',
							'type' => 'text',
							'name' => 'unit',
							'label' => $this->language->get('entry_unit'),
							'value' => $unit['unit'],
							'tooltip' => $this->language->get('help_unit'),
							'placeholder' => $this->language->get('placeholder_unit')
						],
                        [
							'width' => '5',
							'type' => 'text',
							'name' => 'unit',
							'label' => $this->language->get('entry_unit'),
							'value' => $unit['signment'],
							'tooltip' => $this->language->get('help_unit'),
							'placeholder' => $this->language->get('placeholder_unit')
						]
                    ]
                ]
            ]
        ];

        $this->response->addHeader('Content-Type: application/json');
        $this->response->setOutput(json_encode($config, JSON_UNESCAPED_UNICODE));
	}

	protected function validateForm()
	{
		if (!$this->user->hasPermission('modify', 'localisation/unit')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		foreach ($this->request->post['unit_description'] as $language_id => $value) {
			if ((utf8_strlen($value['title']) < 3) || (utf8_strlen($value['title']) > 32)) {
				$this->error['title'][$language_id] = $this->language->get('error_title');
			}

			if (!$value['unit'] || (utf8_strlen($value['unit']) > 4)) {
				$this->error['unit'][$language_id] = $this->language->get('error_unit');
			}
		}

		return !$this->error;
	}

	protected function validateDelete()
	{
		if (!$this->user->hasPermission('modify', 'localisation/unit')) {
			$this->error['warning'] = $this->language->get('error_permission');
		}

		$this->load->model('catalog/product');

		foreach ($this->request->post['selected'] as $unit_id) {
			if ($this->config->get('config_unit_id') == $unit_id) {
				$this->error['warning'] = $this->language->get('error_default');
			}

			$product_total = $this->model_catalog_product->getTotalProductsByUnitId($unit_id);

			if ($product_total) {
				$this->error['warning'] = sprintf($this->language->get('error_product'), $product_total);
			}
		}

		return !$this->error;
	}
}
