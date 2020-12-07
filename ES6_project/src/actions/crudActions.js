/* 
CRUD — Википедия
ru.wikipedia.org›CRUD
CRUD — акроним, обозначающий четыре базовые функции, используемые при работе с базами данных: 
создание (англ. create), чтение (read), модификация (update), удаление (delete)
 */
import { COPY_NODE, UPDATE_NODE, DELETE_NODE, CUT_NODE, PASTE_NODE } from '../constants/actions'

export function copyNode (sourceNode, targetNode) {
	return {
		type: COPY_NODE,		
		sourceNode, 
		targetNode
	}
}

export function updateNode (node, affectedNodes) {
	return {
		type: UPDATE_NODE,
		node,
		affectedNodes
	}
}

export function deleteNode (node, affectedNodes) {
	return {
		type: DELETE_NODE,
		node,
		affectedNodes
	}
}

export function cutNode (node) {
	return {
		type: CUT_NODE,
		node
	}
}

export function pasteNode (node) {
	return {
		type: PASTE_NODE,
		node
	}
}