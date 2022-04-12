import './App.css';
import Card from './components/Card';
import Collapse from './components/Collapse';

function App() {
  return (
    <div className="container">

      <div className="row">
        <div className="card-group w-100">

          <div className="col">
            <Collapse href="collapseExample1" >
              <Card
                cardTitle="Card Title I"
                cardText="Card I : Lorem Ipsum ONE"
                src="https://picsum.photos/id/10/200/300"
              />
            </Collapse>
          </div>

          <div className="col">
            <Collapse href="collapseExample2" >
              <Card
                cardTitle="Card Title II"
                cardText="Card II : Lorem Ipsum TWO"
                src="https://picsum.photos/id/100/200/300"
              />
            </Collapse>
          </div>

          <div className="col">
            <Collapse href="collapseExample3" >
              <Card
                cardTitle="Card Title III"
                cardText="Card III : Lorem Ipsum THREE"
                src="https://picsum.photos/id/1000/200/300"
              />
            </Collapse>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
