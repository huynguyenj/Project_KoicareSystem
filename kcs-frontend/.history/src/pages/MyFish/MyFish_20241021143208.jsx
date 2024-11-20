
import { Button, ButtonBase } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer1';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function MyFishList() {

  const [heartIconClicked, setHeartIconClicked] = useState(false);

  const koiFishList = [];

  const style = {
    list: {
      textAlign: 'center', position: 'relative', fontFamily: 'Arial', margin:'0', padding:'0'
    },
    hr: {
      width: '800px', textAlign: 'center', margin: '0 auto', borderTop: '2px solid #000000'
    },
    button: {
      position: 'relative', right: '20px', top: '25px'
    },
    fishName: {
      fontSize: '20px', fontFamily: 'Arial'
    },
    moreInfo: {
      color: 'black', textDecoration: 'underline'
    }
  }

  const handleClick = () => {
    setHeartIconClicked(!heartIconClicked)
  }

  const getFishes = as

  return (
    <div>
      <div className='grid-container' >
        <h1 style={style.list}>Danh sách cá của tôi</h1>
        <hr style={style.hr} />
        <div className="row" style={{ textAlign: 'center' }}>

          {koiFishList.map((fish) => (
            <div className="col-md-3" key={fish.id}>
              <div className="container">
                <div className="row justify-content-center">
                  <img src={fish.image} alt={fish.name} style={{ width: '70%', height: 'auto', margin: '20px 0' }} />
                  <div className="col-2" style={style.button}>
                    <Button className="btn btn-light">
                      <DeleteOutlineIcon style={{ color: '#000000'}} />
                    </Button>
                    <Button className={`btn btn-light ${(heartIconClicked === true) ? 'backgroundColor-#ff0000' : 'backgroundColor-#f9f9f9'}`} onClick={handleClick}>
                      <FavoriteBorderIcon style={{ color: '#000000' }} />
                    </Button>
                    <Button className="btn btn-light">
                      <AddIcon style={{ color: '#000000' }} />

                    </Button>
                  </div>
                </div>
              </div>
              <div style={{ position: 'relative', right: '25px', bottom: '15px' }}>
                <span style={style.fishName}>{fish.name}</span><br />

                <Link style={style.moreInfo}>Xem thông tin</Link>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
      
    </div>

  )
}


export default MyFishList

