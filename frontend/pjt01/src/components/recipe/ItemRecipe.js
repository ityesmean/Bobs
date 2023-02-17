import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import "./css/ItemRecipe.css"
import heart_b from "../../img/heart_b.png"
import heart from "../../img/heart.png"
import rank from "../../img/Star.png"
import time from "../../img/Clock.png"
import x_btn from "../../img/x.png"
import axios from 'axios'

function ItemRecipe(props) {
  const [modal, setModal] = useState(false);
  const data = props?.recipes;
  const [islike, setIslike] = useState(false);
  const [likecnt, setLikecnt] = useState(props.recipes?.recipe_hit)
  const url ="https://i8b304.p.ssafy.io/api"
  useEffect(() => {
    const i=Object.values(props.like)?.map(item=>item.recipe_id)
    for (let index = 0; index < i.length; index++) {
      if(i[index]===props.recipes.recipe_id){
        setIslike(true);
      }
    }

  }, [islike])
  
  function recipe_ingredient() {
    const url=`https://i8b304.p.ssafy.io/api/recipes/` + props?.recipes.recipe_id;
    // const url=`https://localhost:8080/api/recipes/` + props?.recipes.recipe_id;
      axios.get(url,{
      })
      //   .then(function(response) {
      //     console.log(response.data)
      // })
      //   .catch(function(error) {
      //     console.log(error);
      // })
  }
  return ( 
    <div className='itemrecipe' >
      <div className='recipe_item_food'>
        <div>
          <img className='foodpic' src={props.recipes.recipe_img} alt='food'/>
        </div>
        <div className='foodinfo'>
          <div className='foodinfo_top'>
            {
              props.recipes?.matchRatio ? 
              <div className='match'>
                <div className="info">일치율</div>
                <div className='match_rate'>{props.recipes?.matchRatio}%</div>
              </div> :
              <div className='non_match'></div>
            }
          </div>
          <div className='foodinfo_bottom'>
            <div className='recipe_like'>
              {
                islike === true ?
                <img src={heart} alt="heart" className='recipe_heart_img'/> :
                <img src={heart_b} alt="heart" className='recipe_heart_img'/>
              }
              { 
                likecnt > 1000 ?
                <div>{likecnt/1000}k</div> : <div>{likecnt}</div>
              }</div>
            <div className='recipe_rank'><img src={rank} alt="rank" className='recipe_img'/><br/>{ props.recipes?.recipe_level }</div>
            <div className='recipe_time'><img src={time} alt="time" className='recipe_img'/><br/> { props.recipes?.getRecipe_time ? props.recipes?.getRecipe_time : props.recipes.recipe_time}</div>
          </div>
          { modal === true ? <Modal data={data} userRef={props.userRef} setModal={setModal} setLikecnt={setLikecnt} islike={islike} setIslike={setIslike} /> : null }
        </div>
      </div>      
      <div className='food_name'>{ props.recipes?.recipe_name }</div>  
      <div className='recipe_detail_btn'>
        <div onClick={()=> setModal(true)}>자세히보기</div>
      </div>
    </div>
  )
}

function Modal(data) {
  const recipe = data?.data;
  const [have,sethave] = useState([]);
  const [nohave,setnohave] = useState([]);
  const [likecnt, setLikecnt] = useState(recipe?.recipe_hit);
  const refIngre = data?.userRef;
  const id=localStorage.getItem("id")
  const url="https://i8b304.p.ssafy.io/api";
  useEffect(() => {
    setLikecnt(recipe?.recipe_hit);
    // 레시피 재료 가져오기
    axios.get(url+"/recipes/ingredients/"+recipe.recipe_id,{
    })
      .then(function(response) {
        const rec = refIngre.map((item) => item.ingredient_name)
        const recIngre = response.data.data
        console.log(rec);
        console.log(recIngre);
        let newHave = []  // 냉장고에 있는 재료 저장할 리스트
        let newNoHave = []  // 냉장고에 없는 재료 저장할 리스트
        // 반복문으로 비교하여 있는 재료 없는 재료 구분하여 저장
        if (rec) {
            console.log();
            newHave = (recIngre.filter((itme) => rec.includes(itme.recipe_ingredient)).map((item) => item.recipe_ingredient))
            newNoHave = (recIngre.filter((itme) => !rec.includes(itme.recipe_ingredient)).map((item) => item.recipe_ingredient))
        }
        sethave(newHave)
        setnohave(newNoHave)        
    })
    //   .catch(function(error) {
    // })

  }, [])

    function setLike(){
      axios.put(url+"/recipes/"+recipe.recipe_id+"/like?userId="+id,{

      }).then(function(response) {
        // console.log(response.data)
      })
        .catch(function(error) {
          // console.log(error);
      })
    }

  return (
    <div className="recipe_modal">
      <div className="modal_close_recipe"
        onClick={() => { data?.setModal(false); data?.setLikecnt(likecnt);  }}>
        <img src={x_btn} alt="x" />
      </div>
      <div className='modal_recipe_top'>
        <div>
          <img className='modal_foodpic' src={recipe.recipe_img} alt='food' />
        </div>
        <div className='modal_foodinfo'>
          <div className='modal_foodinfo_top'>
            {
              recipe?.matchRatio ?
                <div className='match'>
                  <div className="info">일치율</div>
                  <div className='match_rate'>{recipe?.matchRatio}%</div>
                </div> :
                <div className='non_match'></div>
            }
          </div>
          <div className='modal_foodinfo_bottom'>
            <div className='modal_recipe_like'>
              {
                data?.islike === true ?
                  <img src={heart} alt="heart" className='recipe_heart_img' onClick={() => { data?.setIslike(!data?.islike); setLikecnt(likecnt - 1); setLike() }} /> :
                  <img src={heart_b} alt="heart" className='recipe_heart_img' onClick={() => { data?.setIslike(!data?.islike); setLikecnt(likecnt + 1); setLike() }} />
              }
              {
                likecnt > 1000 ?
                  <div>{likecnt / 1000}k</div> : <div>{likecnt}</div>
              }</div>
            <div className='modal_recipe_rank'><img src={rank} alt="rank" className='recipe_img' /><br />{recipe?.recipe_level}</div>
            <div className='modal_recipe_time'><img src={time} alt="time" className='recipe_img' /><br />{recipe?.getRecipe_time}</div>
          </div>
        </div>
      </div>
      <div className='modal_food_name'>{recipe?.recipe_name}</div>
      <div className='modal_recipe_item'>
        <div className="modal_item_left">
          <span className='item_info'>냉장고 재료</span>
          <div className='modal_have_item'>
            {
              have?.map((item, index) => {
                return <div className='modal_item' key={index}>{item}</div>
              })
            }
          </div>
        </div>
        <div className="modal_item_right">
          <span className='item_info'>그 외 재료</span>
          <div className='modal_nohave_item'>
            {
              nohave?.map((item, index) => {
                return <div className='modal_item' key={index}>{item}</div>
              })
            }
          </div>
        </div>
      </div>
      <Link to={'/recipe/' + recipe.recipe_id} r_id={recipe?.recipe_id} >
        <div className="move_study_detail">레시피 상세보기</div>
      </Link>
    </div>
  )
}


export default ItemRecipe

