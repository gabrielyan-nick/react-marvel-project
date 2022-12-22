import './charItem.scss';
import abyss from './../../resources/img/abyss.jpg';

const CharItem = () => {
    return (
        <li className="char__item">
        <img src={abyss} alt="abyss"/>
        <div className="char__name">Abyss</div>
    </li>
    )
}

export default CharItem;