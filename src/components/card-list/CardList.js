import Card from './Card'
import './CardList.css'

const CardList = ({monsters}) => (
    <div className='card-list'>
      {monsters.map((monster) => {
          return <Card key={monsters.id} monster={monster} />
        })}
    </div>
  );

export default CardList;