const YoutubeItem = (props) => {
    const { data } = props;
    
    const onClickYoutubeItem = (url) => {
        const newWindow = window.open(url, '_blank', 'noopenner,noreferrer');
        if(newWindow) newWindow.opener = null;
    }

    return (
        <div className="youtubeItem" onClick={() => onClickYoutubeItem(`https://www.youtube.com/watch?v=${data.videoId}`)}>
            <div className="youtubeThumbnail">
                <img className="youtubeImg" src={data.thumbnail.url} alt={data.channelTitle}/>
            </div>
            <div className="youtubeText">{data.channelTitle}</div>
            <div className="youtubeText">{data.description}</div>
        </div>
    );
}

export default YoutubeItem;