import { DND_MERGE_NODE, DND_REPLACE_PARENT, DND_REPLACE_CATEGORY, DND_SORT_NODE, DND_ADD_NODE } from '../constants/actions'

export function dndMergeNode(sourceNode, targetNode, affectedNodes) {
	return {
		type: DND_MERGE_NODE,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndReplaceParent(sourceNode, targetNode, affectedNodes) {
	return {
		type: DND_REPLACE_PARENT,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndReplaceCategory(sourceNode, targetNode, affectedNodes) {
	return {
		type: DND_REPLACE_CATEGORY,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndSortNode(sourceNode, targetNode, affectedNodes) {
	return {
		type: DND_SORT_NODE,
		sourceNode,
		targetNode,
		affectedNodes
	}
}

export function dndAddNode(sourceNode, targetNode, affectedNodes) {
	return {
		type: DND_ADD_NODE,
		sourceNode,
		targetNode,
		affectedNodes
	}
}