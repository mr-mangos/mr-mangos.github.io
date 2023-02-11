class page{
  
  constructor(){
    
    this.egpObjects = [];
    this.events = [];
    
  }
  
  render(){
    
    for (let i = 0; i < this.egpObjects.length; i++) {
      
      this.egpObjects[i].render();
      
    }
    
  }
  
  
}