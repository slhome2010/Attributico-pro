<?php
class ControllerLocalisationUnit extends Controller {
	private $error = array();

	public function index() {
		/* $this->load->language('localisation/unit');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('localisation/unit');

		$this->getList(); */
	}

	public function add() {
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

	public function edit() {
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

	public function delete() {
		/* $this->load->language('localisation/unit');

		$this->document->setTitle($this->language->get('heading_title'));

		$this->load->model('localisation/unit');

		if (isset($this->request->post['selected']) && $this->validateDelete()) {
			foreach ($this->request->post['selected'] as $unit_id) {
				$this->model_localisation_unit->deleteUnit($unit_id);
			}

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

		$this->getUnitList(); */
	}

	public function getUnitList($language_id) {
						
	}

	protected function getForm() {
		$data['heading_title'] = $this->language->get('heading_title');

		$data['text_form'] = !isset($this->request->get['unit_id']) ? $this->language->get('text_add') : $this->language->get('text_edit');

		$data['entry_title'] = $this->language->get('entry_title');
		$data['entry_unit'] = $this->language->get('entry_unit');
		$data['entry_value'] = $this->language->get('entry_value');

		$data['help_value'] = $this->language->get('help_value');

		$data['button_save'] = $this->language->get('button_save');
		$data['button_cancel'] = $this->language->get('button_cancel');

		if (isset($this->error['warning'])) {
			$data['error_warning'] = $this->error['warning'];
		} else {
			$data['error_warning'] = '';
		}

		if (isset($this->error['title'])) {
			$data['error_title'] = $this->error['title'];
		} else {
			$data['error_title'] = array();
		}

		if (isset($this->error['unit'])) {
			$data['error_unit'] = $this->error['unit'];
		} else {
			$data['error_unit'] = array();
		}

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

		$data['breadcrumbs'] = array();

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('text_home'),
			'href' => $this->url->link('common/dashboard', 'token=' . $this->session->data['token'], true)
		);

		$data['breadcrumbs'][] = array(
			'text' => $this->language->get('heading_title'),
			'href' => $this->url->link('localisation/unit', 'token=' . $this->session->data['token'] . $url, true)
		);

		if (!isset($this->request->get['unit_id'])) {
			$data['action'] = $this->url->link('localisation/unit/add', 'token=' . $this->session->data['token'] . $url, true);
		} else {
			$data['action'] = $this->url->link('localisation/unit/edit', 'token=' . $this->session->data['token'] . '&unit_id=' . $this->request->get['unit_id'] . $url, true);
		}

		$data['cancel'] = $this->url->link('localisation/unit', 'token=' . $this->session->data['token'] . $url, true);

		if (isset($this->request->get['unit_id']) && ($this->request->server['REQUEST_METHOD'] != 'POST')) {
			$unit_info = $this->model_localisation_unit->getUnit($this->request->get['unit_id']);
		}

		$this->load->model('localisation/language');

		$data['languages'] = $this->model_localisation_language->getLanguages();

		if (isset($this->request->post['unit_description'])) {
			$data['unit_description'] = $this->request->post['unit_description'];
		} elseif (isset($this->request->get['unit_id'])) {
			$data['unit_description'] = $this->model_localisation_unit->getUnitDescriptions($this->request->get['unit_id']);
		} else {
			$data['unit_description'] = array();
		}

		if (isset($this->request->post['value'])) {
			$data['value'] = $this->request->post['value'];
		} elseif (!empty($unit_info)) {
			$data['value'] = $unit_info['value'];
		} else {
			$data['value'] = '';
		}

		$data['header'] = $this->load->controller('common/header');
		$data['column_left'] = $this->load->controller('common/column_left');
		$data['footer'] = $this->load->controller('common/footer');

		$this->response->setOutput($this->load->view('localisation/unit_form', $data));
	}

	protected function validateForm() {
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

	protected function validateDelete() {
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