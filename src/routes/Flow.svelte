<script lang="ts">
  import { calcAllStates } from '$lib/utils';
  import { resources, actions } from './store';
  import { writable } from 'svelte/store';
  import dagre from '@dagrejs/dagre';
  import {
    SvelteFlow,
    Background,
    Position,
    ConnectionLineType,
    Panel,
    Controls,
    MiniMap,
    type Node,
    type Edge
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 172;
  const nodeHeight = 36;

  function getLayoutedElements(nodes: Node[], edges: Edge[], direction = 'TB') {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = isHorizontal ? Position.Left : Position.Top;
      node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2
      };
    });

    return { nodes, edges };
  }

  const nodes = writable<Node[]>([]);
  const edges = writable<Edge[]>([]);

  function onLayout(direction: string) {
    const layoutedElements = getLayoutedElements($nodes, $edges, direction);

    $nodes = layoutedElements.nodes;
    $edges = layoutedElements.edges;
  }

  function handleAnalyze(){
    const initState = {id: crypto.randomUUID(), resources: $resources};
    const {states, transitions} = calcAllStates(initState, $actions);

    $nodes = [];
    for (let state of states)  {
      const id = state.id;
      const label  = []
      for (let resource of state.resources)  {
        const resourceLabel  = `${resource.name}: ${resource.amount}`;
        label.push(resourceLabel);
      }
      $nodes.push({id, data:{label}, position:{x:0, y:0}});
    }

    $edges = [];
    for (let transition of transitions) {
      $edges.push({
        id: transition.id,
        label: transition.label,
        source: transition.source,
        target: transition.target
      });
    }
  }
</script>

<h2>Analyze</h2>
<button on:click={handleAnalyze}>Analyze</button>

<div style="height:500px;">
  <SvelteFlow
    {nodes}
    {edges}
    fitView
  >
    <Panel position="top-right">
      <button on:click={() => onLayout('TB')}>vertical layout</button>
      <button on:click={() => onLayout('LR')}>horizontal layout</button>
    </Panel>
    <Controls />
    <MiniMap />
    <Background />
  </SvelteFlow>
</div>