import axios from 'axios';
import { useEffect, useState } from 'react';
import '../css/RoomMain.css';
import RoomList from "./RoomList";
import RoomModal from "./RoomModal";

const RoomMain = () => {

	const username = window.sessionStorage.getItem('username');
	const [ rommInfo, setRoomIfo ] = useState([]);
	const [ visibility, setVisibility] = useState(false);
	const [ fetching, setFetching ] = useState(true);

	useEffect(() => {
		setFetching(true)
		if(fetching === true) {
			getRoomList();
		}

		return () => ( setFetching(false));

	},[fetching]);

	// 모달 오픈
	const openModal = async () => {
		setVisibility(true);
	}

	// 모달 클로즈
	const closeModal = async () => {
		setVisibility(false);
	}

	// 방 목록 조회
	const getRoomList = async () => {
		await axios.get('/room')
			.then(res => {
				if(res.status === 200) {
					setRoomIfo(res.data);
				}
			});
	}

    return (
        <div className="main">
			<div className="bg">
				<div className="container">
					{/* <!-- Title --> */}
					<div className="mainTitle">Instruct</div>
					
					{/* <!-- 로그인 회원 정보 --> */}
					<div className="memberInfo">
						<div className="memberName">{username}</div>
						{/* <div className="history"></div> */}
					</div>

					{/* <!-- 내용 --> */}
					<div className="content">
						<div className="contentLayout">
							<div className="createArea">
								<div className="creactBtn" onClick={openModal}/>
							</div>

							{/* <!-- 방목록 --> */}
							<div className="roomListArea">
								<div className="roomList">

									<RoomList roomInfo={rommInfo}/>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<RoomModal visible={visibility} close={closeModal}/>
		</div>
    );    
}

export default RoomMain;
