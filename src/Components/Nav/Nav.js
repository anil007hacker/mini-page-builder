import React, { Component } from 'react'
import { Modal } from 'antd';
import './Nav.css'
import { MoreOutlined } from '@ant-design/icons';

export class Nav extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       tasks : [
         {name:"Label", category:"nav", bgcolor:"white"},
         {name:"Input", category:"nav", bgcolor:"white"},
         {name:"Button", category:"nav", bgcolor:"white"},
       ],
       //input regarding states
       x_position_input : 0,
       y_position_input : 0,
       text_input : '',
       isModalVisible : false,
       font_size_input : '',
       font_weight_input : "",
       //button reagrding states
       isButtonModalVisible : false,
       x_position_button : 0,
       y_position_button : 0,
       text_button : 'Submit',
       //label reagrding states
       labelText : "This is label text",
       x_position_label : 0,
       y_position_label : 0,
       isLabelModalVisible : false,
       font_size_label : 15,
       font_weight_label : 0
    }
  }

  handleDragOver = (ev) => {
    ev.preventDefault();
  }

  handleDragStart = (ev, id) => {
    console.log('DragStart : ', id);
    ev.dataTransfer.setData('id',id);
  }

  handleOnDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((tasks)=>{
      if(tasks.name==id){
        if(tasks.name=='Input'){
          console.log("ID",id)
        let newElement = document.createElement('input');
        var click_input=0
        document.getElementsByClassName("drop-input")[0].appendChild(newElement).setAttribute( "class", "dynamic-input" )
        newElement.setAttribute('id','dynamic-input-ID')
        var arr_input = document.getElementsByClassName("drop-input")
        arr_input[0].addEventListener('click',function(event){
          var ele_input = document.getElementById(event.target.id);
          click_input=1
          if(click_input==1){
            document.addEventListener('keydown', function(event) {
              const key = event.key; 
              if (key === "Delete") {
                  var element = document.getElementsByClassName("dynamic-input")[0];
                  console.log("Parent Node is ------->",element.parentNode)
                  ele_input.style.display="none";
                  this.removeInputLocal();
                  click_input=0;
              }
              if (key === "Enter") {
                var element = document.getElementsByClassName("dynamic-input")[0];
                this.setState({
                  isModalVisible : true
                })
                click_input=0;
              }
          }.bind(this),false);
          }
        }.bind(this))
          
        document.addEventListener('click',function(e){
          if(e.target && e.target.className== 'dynamic-input'){
            this.setState({
              isModalVisible : true
            })
           }
       }.bind(this));
        }
        if(tasks.name=='Button'){
          console.log("ID",id)
        let newElement = document.createElement('button');
        var text=0
        document.getElementById("droppable-div").appendChild(newElement).setAttribute( "class", "dynamic-button" );
        newElement.innerHTML = this.state.text_button
        newElement.setAttribute('id',`dynamic-Button-ID${text}`)
        console.log(newElement.id)
        text++
        var clicked=0;
        
        var array = document.getElementsByClassName("dynamic-button")
        console.log("length",array.length)
        array[0].addEventListener('click', function(event) {
          console.log(event.target.id)
          var ele = document.getElementById(event.target.id);
          console.log("Element clicked is--->",ele)
          clicked=1;
          if(clicked==1){
            document.addEventListener('keydown',function(event){
              const key = event.key; 
              if (key === "Delete") {
                console.log("Count of clicked",clicked)
                ele.style.display = "none";
                clicked=0;
              console.log("Count after clicked",this.clicked)
              this.removeButtonLocal();
            }
            if (key === "Enter") {
              // var element = document.getElementsByClassName("dynamic-button")[0];
              this.setState({
                isButtonModalVisible : true
              })
            }
            }.bind(this))
          }
          
      }.bind(this),false);
        }
        if(tasks.name=='Label'){
          console.log("ID",id)
        let newElement = document.createElement('label');
        document.getElementsByClassName("droppable")[0].appendChild(newElement).setAttribute( "class", "dynamic-label" )
        newElement.innerHTML = this.state.labelText
        document.addEventListener('click',function(e){
          if(e.target.className=="dynamic-label" && e.target){
            this.setState({
              isLabelModalVisible : true
            })
          }
        }.bind(this))
        document.addEventListener('keyup', function(event){
          const key = event.key;
          if(key=="Delete"){
            document.getElementsByClassName("dynamic-label")[0].style.display = "none"
          }
        })
        }
      }
      return tasks;
    })
  }

  handleXPos = (event) => {
    if(event.target.value<0){
      this.setState({
        x_position_input : 0
      })
    }
    else if(event.target.value>692 && this.state.y_position_input!==''){
      this.setState({
        x_position_input : 692,
      })
    }
    else if(event.target.value>692 && this.state.y_position_input===''){
      this.setState({
        y_position_input : 0,
        x_position_input : 692
      })
    }
    else{
      this.setState({
        x_position_input : event.target.value
      })
    }
  }

  handleYPos = (event) => {
    if(event.target.value<0){
      this.setState({
        y_position_input : 0
      })
    }
    else if(event.target.value>617 && this.state.x_position_input!==''){
      this.setState({
        y_position_input : 617,
      })
    }
    else if(event.target.value>617 && this.state.x_position_input===''){
      this.setState({
        y_position_input : 617,
        x_position_input : 0
      })
    }
    else{
      this.setState({
        y_position_input : event.target.value
      })
    }
  }

  handleCancel = () => {
    this.setState({
      isModalVisible : false,
      isButtonModalVisible : false,
      isLabelModalVisible : false
    })
  }

  
  changeInputPlace= () =>{
    var x_pos = this.state.x_position_input
    var y_pos = this.state.y_position_input
    var font_size  = this.state.font_size_input
    var font_weight = this.state.font_weight_input
    var d = document.getElementsByClassName('dynamic-input')[0];
    console.log("value of D--->",d)
    d.style.position = "absolute";
    d.style.left = x_pos+'px';
    d.style.top = y_pos+'px';
    d.style.fontSize = font_size+'px';
    d.style.fontWeight = font_weight+'px';
    this.setState({
      isModalVisible : false
    })
    document.getElementsByClassName("dynamic-input")[0].setAttribute("value",`${this.state.text_input}`)
  }

  handleInputText = (event) => {
    this.setState({
      text_input : event.target.value
    })
  }

  handleFontSize = (event) => {
    this.setState({
      font_size_input : event.target.value
    })
  }

  handleFontWeight = (event) => {
    this.setState({
      font_weight_input : event.target.value
    })
  }

  removeInputLocal=()=> {
    localStorage.removeItem("input_state_x")
    localStorage.removeItem("input_state_y")
    localStorage.removeItem("font_weight_input")
    localStorage.removeItem("text_input")
    localStorage.removeItem("font_size_input")
  }

  removeButtonLocal=()=> {
    localStorage.removeItem("button_state_x")
    localStorage.removeItem("button_state_y")
    localStorage.removeItem("text_button")
  }

  componentWillMount() {
    localStorage.getItem('input_state_x','input_state_y','text_input','font_size_input','font_weight_input') && this.setState({
      x_position_input : JSON.parse(localStorage.getItem('input_state_x')),
      y_position_input : JSON.parse(localStorage.getItem('input_state_y')),
      text_input : JSON.parse(localStorage.getItem('text_input')),
      font_size_input : JSON.parse(localStorage.getItem('font_size_input')),
      font_weight_input : JSON.parse(localStorage.getItem('font_weight_input')),
    })
  }
  
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('input_state_x', JSON.stringify(nextState.x_position_input))
    localStorage.setItem('input_state_y', JSON.stringify(nextState.y_position_input))
    localStorage.setItem('text_input', JSON.stringify(nextState.text_input))
    localStorage.setItem('font_size_input', JSON.stringify(nextState.font_size_input))
    localStorage.setItem('font_weight_input', JSON.stringify(nextState.font_weight_input))
    localStorage.setItem('button_state_x', JSON.stringify(nextState.x_position_button))
    localStorage.setItem('button_state_y', JSON.stringify(nextState.y_position_button))
    localStorage.setItem('text_button', JSON.stringify(nextState.text_button))
  }
  
      // x_position_input : 0,
      //  y_position_input : 0,
      //  text_input : '',
      //  isModalVisible : false,
      //  font_size_input : '',
      // x_position_button : 0,
      //  y_position_button : 0,
      //  text_button : 'Submit',
      //  font_weight_input : "",
      //  labelText : "Hello",

      changeButtonPlace = () => {
        console.log("Inside Change Button Place")
        var x_pos = this.state.x_position_button
        var y_pos = this.state.y_position_button
        var d = document.getElementsByClassName('dynamic-button')[0];
        console.log("value of D--->",d)
        d.style.position = "absolute";
        d.style.left = x_pos+'px';
        d.style.top = y_pos+'px';
        this.setState({
          isButtonModalVisible : false
        })
    document.getElementsByClassName("dynamic-button")[0].innerHTML = this.state.text_button
      }

      handleButtonText = (event) => {
        this.setState({
          text_button : event.target.value
        })
        console.log(this.state.text_button)
      }

      handleXPosButton = (event) => {
        this.setState({
          x_position_button : event.target.value
        })
      }

      handleYPosButton = (event) => {
        this.setState({
          y_position_button : event.target.value
        })
      }

      changeLabelPlace = ()=> {
        var x_pos = this.state.x_position_label
        var y_pos = this.state.y_position_label
        var font_size  = this.state.font_size_label
        var font_weight = this.state.font_weight_label
        var d = document.getElementsByClassName('dynamic-label')[0];
        console.log("value of D--->",d)
        d.style.position = "absolute";
        d.style.left = x_pos+'px';
        d.style.top = y_pos+'px';
        d.style.fontSize = font_size+'px';
        d.style.fontWeight = font_weight+'px';
        this.setState({
          isLabelModalVisible : false
        })
    document.getElementsByClassName("dynamic-label")[0].innerHTML = this.state.labelText
      }

      handleLabelText = (event) => {
        this.setState({
          labelText : event.target.value
        })
      }

      handleXPosLabel = (event) => {
        this.setState({
          x_position_label : event.target.value
        })
      }

      handleYPosLabel = (event) => {
        this.setState({
          y_position_label : event.target.value
        })
      }

      handleFontSizeLabel = (event)=> {
        this.setState({
          font_size_label : event.target.value
        })
      }

      handleFontWeightLabel = (event)=> {
        this.setState({
          font_weight_label : event.target.value
        })
      }

  render() {
    var tasks = {
      nav : [],
      main : []
    }

    this.state.tasks.forEach((t)=>{
      tasks[t.category].push(
        <div key={t.name}
            onDragStart = {(e)=>this.handleDragStart(e,t.name)}
            draggable
            className="draggable"
            style={{backgroundColor:t.bgcolor, borderRadius:"5px"}}
            
        ><MoreOutlined style={{marginLeft:"20px"}}/>{t.name}<br></br></div>
          
      )
    })

    return (
      <div className="container-drag">
        <div 
          className="wip" 
          onDrop = {(e)=>this.handleOnDrop(e, "nav")}
        >
          <span className="task-header">Blocks</span>
          {tasks.nav}
        </div>
        <div 
          className="droppable" 
          id="droppable-div"
          onDragOver={(e)=>this.handleDragOver(e)}
          onDrop = {(e)=>this.handleOnDrop(e, "main")}
          >
          {tasks.main}
          <div className="drop-input"></div>
        </div>
        
        <div>
        <Modal title="Edit Input" onOk={this.changeInputPlace} visible={this.state.isModalVisible} onCancel={this.handleCancel} style={{width:"400px"}}>
          <label>Text</label>
          <input className="modal-input" placeholder="Text Value" onChange={this.handleInputText} value={this.state.text_input} autoFocus/><br></br><br></br>
          <label>X</label>
          <input className="modal-input" placeholder="x_position" onChange={this.handleXPos} value={this.state.x_position_input} /><br></br><br></br>
          <label>Y</label>
          <input className="modal-input" placeholder="y_position" onChange={this.handleYPos} value={this.state.y_position_input} /><br></br><br></br>
          <label>Font Size</label>
          <input className="modal-input" placeholder="Font Size" onChange={this.handleFontSize} value={this.state.font_size_input} /><br></br><br></br>
          <label>Font Weight</label>
          <input className="modal-input" placeholder="Font Weight" onChange={this.handleFontWeight} value={this.state.font_weight_input} /><br></br><br></br>
        </Modal>
        </div>
        <div>
        <Modal title="Edit Button" onOk={this.changeButtonPlace} visible={this.state.isButtonModalVisible} onCancel={this.handleCancel} style={{width:"400px"}}>
          <label>Text</label>
          <input className="modal-input" placeholder="Text Value" onChange={this.handleButtonText} value={this.state.text_button} autoFocus/><br></br><br></br>
          <label>X</label>
          <input className="modal-input" placeholder="x_position" onChange={this.handleXPosButton} value={this.state.x_position_button} /><br></br><br></br>
          <label>Y</label>
          <input className="modal-input" placeholder="y_position" onChange={this.handleYPosButton} value={this.state.y_position_button} /><br></br><br></br>
        </Modal>
        </div>
        <div>
        <Modal title="Edit Label" onOk={this.changeLabelPlace} visible={this.state.isLabelModalVisible} onCancel={this.handleCancel} style={{width:"400px"}}>
          <label>Text</label>
          <input className="modal-input" placeholder="Text Value" onChange={this.handleLabelText} value={this.state.labelText} autoFocus/><br></br><br></br>
          <label>X</label>
          <input className="modal-input" placeholder="x_position" onChange={this.handleXPosLabel} value={this.state.x_position_label} /><br></br><br></br>
          <label>Y</label>
          <input className="modal-input" placeholder="y_position" onChange={this.handleYPosLabel} value={this.state.y_position_label} /><br></br><br></br>
          <label>Font Size</label>
          <input className="modal-input" placeholder="Font Size" onChange={this.handleFontSizeLabel} value={this.state.font_size_label} /><br></br><br></br>
          <label>Font Weight</label>
          <input className="modal-input" placeholder="Font Weight" onChange={this.handleFontWeightLabel} value={this.state.font_weight_label} /><br></br><br></br>
        </Modal>
        </div>
      </div>
      
    )
  }
}

export default Nav
