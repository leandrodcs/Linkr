import styled from "styled-components";
import {AiOutlineClose} from "react-icons/ai";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export default function LocationModal({setOpenModal, openModal, geolocation, username}) {

    const location = {lat: parseFloat(geolocation.latitude), lng: parseFloat(geolocation.longitude)};

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDABacrjTDIwvPG-dOVlMsbLVTi_P1IRbw"
      })

    return(
        <Background openModal={openModal}>
            <DialogBox >
                <>
                    <Header>
                        <h1><span>{username}</span><span>'s location</span></h1>
                        <Button onClick={() => setOpenModal(false)}>
                            <AiOutlineClose />
                        </Button>
                    </Header>
                    <Map>
                        {isLoaded ? (
                                <GoogleMap
                                mapContainerStyle={mapStyle}
                                zoom={13}
                                center={location}
                            >
                                <Marker key={"Origem do post"} position={location}/>
                            </GoogleMap>
                        ) : ""}
                    </Map>
                </>
            </DialogBox>
        </Background>
    );
}

const Map = styled.div`
    width: 713px;
    height: 240px;
    margin-top: 7px;

    div {
        border-radius: 5px;
    }
    @media(max-width: 937px) {
        width: 545px;
        height: 210px;
    }
    @media(max-width: 637px) {
        width: 480px;
        height: 160px;
    }
`;

const Button = styled.button`
    cursor: pointer;
    color: #FFF;
    font-size: 30px;
    @media(max-width: 937px) {
        font-size: 28px;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-weight: bold;
        font-size: 38px;
        line-height: 56px;
        display: flex;
    }
    span:nth-child(1) {
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        max-width: 63%;
    }

    @media(max-width: 937px) {
        h1 {
            font-size: 30px;
            line-height: 42px;

        }
    }
`;

const Background = styled.div`
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({openModal}) => openModal ? `100%` : `0px`};
    overflow: hidden;
    background: rgba(255, 255, 255, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const DialogBox = styled.div`
    padding: 10px 40px 33px 40px;
    width: 790px;
    height: 354px;
    background: #333333;
    border-radius: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin-bottom: ${({openModal}) => openModal ? `0px` : `100px`};
    @media(max-width: 937px) {
        width: 600px;
        height: 283px;
        padding: 6px 25px 25px 25px;
    }
    @media(max-width: 637px) {
        width: 513.5px;
        height: 230px;
        padding: 6px 15px 15px 15px;
    }
`;

const mapStyle = {        
    height: "100%",
    width: "100%",
};
