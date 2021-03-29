import '../css/Room.css';
import YoutubeItem from './YoutubeItem';

const YoutubeList = (props) => {

    const { youtubeSearchData, visible, close } = props;
    const youtubeItems = youtubeSearchData.map((data, index) => <YoutubeItem data={data} key={index}/>);

    return (
        <div className="youtubeOverlay" style={{display : visible === true ? 'block' : 'none'}}>
            <div className="youtubeInner">

                <div className="youtubeList">
                    
                    {youtubeItems}
                    
                </div>
            </div>
            <div className="closeYoutubeBtn" onClick={close}></div>
        </div>
    );
}

export default YoutubeList;