import React, { useState, useEffect, useRef } from 'react';
import AddItem from './AddItem';
import EditItem from './EditItem';
import GetItem from './GetItem';
import Allergy from './AllergyItem'
import SelectedItem from './SelectedItem';
import SelectedItemMove from './SelectedItemMove';
import axios from 'axios';
import './css/RefMain.css'
import Toggle from '../Toggle.component';
import { useHistory } from 'react-router-dom';

function RefMain() {

  const [f_item,setf_item] = useState([]);
  const [s_item,sets_item] = useState([]);
  const [getUserItem,setgetUserItem] =useState([]);
  // const [getUserItem,setgetUserItem] =useState([]);
  const [getitem,setgetitem] =useState([]);
  const [getforitem,setgetforitem] =useState([]);
  const [checked, setChecked] = useState(false);
  const [fixchecked, setFixChecked] = useState(false);
  // const [name,setName] =useState("");
  // const [profile,setProfile] =useState("")
  const [id,setId] =useState(localStorage.getItem("id"))
  const [checkedasync, setCheckedasync] = useState(false);
  const [checkedasync2, setCheckedasync2] = useState(false);
  // const local_id = localStorage.getItem("id")
  const url="https://i8b304.p.ssafy.io/api/refriges";
  // const url="http://localhost:8080/refriges";
  const history=useHistory()
  useEffect(() => {
    // setName(localStorage.getItem("name"))
    // setProfile(localStorage.getItem("profile"))
    // setId(localStorage.getItem("id"))
    
    if(getitem.length ===0){
      setChecked(false);
    }


    var data = JSON.stringify(id);
    var config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
      .then(function(response) {
          setgetUserItem(response.data.data);
          setf_item(getUserItem?.filter(item => item.refrige_ingredient_prior === true)
          )
        
          sets_item(getUserItem?.filter(item => item.refrige_ingredient_prior === false)
          )
          setCheckedasync(true);
      })
      .catch(function(error) {
          console.log("실패",error);
      })
  }, [checkedasync])

  const addItem=(item)=>{
    setChecked(true);
    setgetitem([...getitem, item ])
    setgetforitem([...getforitem, item ])

  };
  const deleteItem=(item)=>{
    if(getitem.length===1){
      setChecked(false);
    }
    setgetitem(getitem.filter(items => items !== item));
    setgetforitem(getforitem.filter(items => items !== item));

  };

  const addforItem=(item)=>{
    setChecked(true);
    setgetforitem([...getforitem, item ])
  };

  const deleteforItem=(item)=>{
    // console.log(getitem)
    if(getitem.length===1){
      setChecked(false);
    }
    setgetforitem(getforitem.filter(items => items !== item));
  };

  // 재료 삭재
  function godel(){
    var data = JSON.stringify(id);
    var config = {
      method: 'post',
      url: url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
      .then(function(response) {
          setgetUserItem(response.data.data);
          setf_item(response.data.data?.filter(item => item.refrige_ingredient_prior === true)
          )
        
          sets_item(response.data.data?.filter(item => item.refrige_ingredient_prior === false)
          )
          setCheckedasync(false);
          setgetitem([])
          setgetforitem([])
      })
      // .catch(function(error) {
      //     console.log("실패",error);
      // })
  };


  const changeitemToPriority=(item)=>{
    const itemarray={ingredient_id:item.ingredient_id,ingredient_name:item.ingredient_name}
    sets_item(s_item.filter(items => items.ingredient_id !== item.ingredient_id));
    setf_item([...f_item, itemarray ]);
  };
  const changeitemToNormal=(item)=>{
    const itemarray={ingredient_id:item.ingredient_id,ingredient_name:item.ingredient_name}
    setf_item(f_item.filter(items => items.ingredient_id !== item.ingredient_id));
    sets_item([...s_item, itemarray ]);
  };

  const onstatechange = () => {
    const setf = f_item.map((items) => items.ingredient_id)
    const sets = s_item.map((items) => items.ingredient_id)
    var update_list = []
    const flist = []
    // 우선 순위 재료 넣기
    for (let index = 0; index < setf.length; index++) {
      flist.push(
        {
          "ingredient_id": setf[index],
          "is_deleted": false,
          "is_prior": true
        }
      );
    }
    // 일반 순위 재료 넣기
    for (let index = 0; index < sets.length; index++) {
      flist.push(
        {
          "ingredient_id": sets[index],
          "is_deleted": false,
          "is_prior": false
        }
      );
    }
    if (flist.length !== 0) {
      axios.put(url,
        {
          "user_id": id,
          "ingredient_list": flist
        }
      ).then((res) => {
        // console.log(res)
      }
      )

    }

  }
  
  return (
  <div className='ref_main'>
    <div className="ref_title">나의 냉장고</div>
      <div className="itembox">
        <AddItem />
        { getitem.length>=1 ? <EditItem item={getitem} godel={godel}/> : <Allergy />}
        <GetItem  item={getforitem}></GetItem>
      </div>
      <div className='priority_item_box'>
        <div className='text'>냉장실</div>
        <Toggle
          checked = {fixchecked}
          onChange = {(e) => {
            setFixChecked(e.target.checked)
            setgetitem([])
            setgetforitem([])
            if(fixchecked){
              onstatechange()
            }
          }}
          offstyle="off"
          onstyle="on"
          text="수정 모드">
        </Toggle>
      </div>
      { fixchecked === false ?  
      <div>
        <div className='priority_item'  onClick={()=>{setChecked(true)}}>
          {
            f_item?.map((item, index) => {
              return <SelectedItem key={index} item={item}  
              addItem={addItem}
              deleteItem={deleteItem}
              addforItem={addforItem}
              deleteforItem={deleteforItem}
              />
            })
          }    
        </div>
          <div className='text'>냉동실</div>
          <div className='last_item'>
          {
            s_item?.map((item, index) => {
              return <SelectedItem key={index} item={item}  
              addItem={addItem}
              deleteItem={deleteItem}
              addforItem={addforItem}
              deleteforItem={deleteforItem}
              />
            })
          }
        </div>
      </div>
      : 
      <div>
        <div className='priority_item'>
          {
            f_item?.map((item, index) => {
              return <SelectedItemMove key={index} item={item} check={true} 
              changeitemToNormal={changeitemToNormal}
              // onstatechange={onstatechange}
              />
            })
          }    
        </div>
          <div className='text'>냉동실</div>
          <div className='last_item'>
          {
            s_item?.map((item, index) => {
              return <SelectedItemMove key={index} item={item} check={false} 
              changeitemToPriority={changeitemToPriority}
              // onstatechange={onstatechange}
              />
            })
          }
        </div>
      </div>
      }
  </div>
  );
}
  
export default RefMain;
