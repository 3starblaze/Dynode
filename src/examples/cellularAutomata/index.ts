import { Node, NodeType, Engine } from 'src/Dynode/model';
import { NetworkController } from 'src/Dynode/controller';
import type { Network } from 'src/Dynode/model';
import type { StageView } from 'src/Dynode/view';
import './style.scss';
import GridNodeView from './gridNode';

export default function cellularAutomata(
  network: Network, stage: StageView,
) : NetworkController {
  const controller = new NetworkController(network, stage);
  // eslint-disable-next-line no-param-reassign
  network.engine = new Engine();
  stage.addNodeType('grid', GridNodeView);
  network.engine.addNodeTypeDefinition(new NodeType(
    'grid',
    ((node: Node) => {
      const n = node;
      n.addInput('x', 'number').setDefaultValue(0);
      n.addInput('y', 'number').setDefaultValue(0);
      n.addOutput('result');
      n.action = function (this: Node) {
        // TODO
      };
      return n;
    }),
  ));
  const n1 = new Node('grid1', network, network.engine.getNodeTypeDefinition('grid'));
  network.addNode(n1);
  network.resolve().then(() => {
    // This "then" clause checks whether grid is updated properly
    n1.inputs.getSocketByName('x').setDefaultValue(1);
    n1.inputs.getSocketByName('y').setDefaultValue(2);
    network.resolve();
  });

  return controller;
}
