<?php
class Tree
{

    private $options = array();
    private $rootNode = array();   

    public function __construct(Node $node, $options = array())
    {
        foreach ($options as $key => $value) {
            $this->options[$key] = $value;
        }
        $this->rootNode[0] = $node->nodeData;
    }

    public function set($key, $value)
    {
        $this->options[$key] = $value;
    }

    public function render()
    {
        return $this->rootNode;
    }

    public function renderjson()
    {
        return json_encode($this->rootNode);
    }
}
class Node
{

    private $nodeData = array();

    public function __construct($options = array())
    {
        foreach ($options as $key => $value) {
            $this->nodeData[0][$key] = $value;
        }
    }

    public function __get($property)
    {
        if ($property == "nodeData") {
            if ($this->nodeData) {
                return $this->nodeData[0];
            } else {
                return array();
            }
        } else {
            foreach ($this->nodeData[0] as $data) {
                if (array_key_exists($property, $data)) {
                    $aprop[] = $data[$property];
                } else {
                    $aprop[] = null;
                }
            }
            return $aprop;
        }
    }

    public function __set($property, $value)
    {
        if ($property == "nodeData") {
            $this->nodeData = array();
            $this->nodeData[0] = $value;
        } else {
            foreach ($this->nodeData[0] as $data) {
                if (array_key_exists($property, $data)) {
                    $data[$property] = $value;
                }
            }
        }
    }

    public function addSibling(Node $sibling)
    {
        $this->nodeData[] = $sibling->nodeData[0];
    }

    public function sort()
    {
        $sort_order = array();
        foreach ($this->nodeData as $key => $value) {
            $sort_order[$key] = $value['title'];
        }
        array_multisort($sort_order, SORT_ASC, $this->nodeData);
    }

    public function render()
    {
        return $this->nodeData;
    }
}
