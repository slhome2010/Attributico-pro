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

	public function saveForm() {
		$unit_id = isset($this->request->get['unit_id']) ? (int)$this->request->get['unit_id'] : 0;
		$values = isset($this->request->get['values']) ? $this->request->get['values'] : [];

		foreach($values as $key => $value) {
			$name = explode("_", $key)[0];
			$language_id = explode("_", $key)[1];
			$data['unit_description'][$language_id][$name] = $value;
		}

		$this->load->model('localisation/unit');

		if($unit_id) {
			$this->model_localisation_unit->editUnit($unit_id, $data);
		} else {
			$this->model_localisation_unit->addUnit($data);
		}

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

	public function getForm()
	{
		$unit_id = isset($this->request->get['unit_id']) ? $this->request->get['unit_id'] : 0;
		$config = [];

		$this->load->model('localisation/language');

		if ($unit_id) {
			$this->load->model('localisation/unit');
			$units = $this->model_localisation_unit->getUnits(['unit_id' => $unit_id]);
			foreach($units as $key => $unit) {
				$language = $this->model_localisation_language->getLanguage($unit['language_id']);
				$units[$key]['flag'] = 'language/' . $language['code'] . '/' . $language['code'] . '.png';
			}
		} else {			
			$languages = $this->model_localisation_language->getLanguages();
			foreach ($languages as $language) {
				$units[] = ['language_id' => $language['language_id'], 'flag' => 'language/' . $language['code'] . '/' . $language['code'] . '.png','title' => '', 'unit' => ''];
			}
		}

		$this->load->language('localisation/unit');

		$config = [
			'title' => $this->language->get('form_title'),
			'elements' => array_map(
				function ($unit) {
					$row = [
						'rowname' => 'units_' . $unit['language_id'],
						'cols' => [							
							[
								'width' => '7',
								'type' => 'input-group',
								'name' => 'title_' . $unit['language_id'],
								'label' => $this->language->get('entry_unit'),
								'value' => $unit['title'],
								'src' => $unit['flag'],
								'tooltip' => $this->language->get('help_unit'),
								'placeholder' => $this->language->get('placeholder_unit'),
								'validationProps' => [
									'required' => $this->language->get('error_required')
								]
							],
							[
								'width' => '1',
								'type' => 'space'
								
							],
							[
								'width' => '4',
								'type' => 'input-group',
								'name' => 'unit_' . $unit['language_id'],
								'label' => $this->language->get('entry_unit'),
								'value' => $unit['unit'],
								'src' => $unit['flag'],
								'tooltip' => $this->language->get('help_unit'),
								'placeholder' => $this->language->get('placeholder_unit')
							]
						]
					];
					return $row;
				},
				$units
			)
		];

		$this->response->addHeader('Content-Type: application/json');
		$this->response->setOutput(json_encode($config, JSON_UNESCAPED_UNICODE));
	}

	
}
