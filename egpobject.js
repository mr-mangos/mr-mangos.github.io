class egpObject{
  
  set_propertie(Name, Value){
    
    for (let i = 0; i < this.properties.length; i++) {
      
      if(this.properties[i].name == Name){
        
        this.properties[i].value = Value;
        
      }
      
    }
    
  }
  
  get_propertie(Name){
    
    let r;
    
    for (let i = 0; i < this.properties.length; i++) {
      
      if(this.properties[i].name == Name){
        
        r = this.properties[i].value;
        
        if(this.properties[i].type == "number"){ r = parseInt(r); }
        
      }
      
    }
      
    return r;
    
  }
  
  constructor(Index){
    
    this.properties = [];
    this.selected = false;
    
    let Nam = new propertie("name", "string", "");
    Nam.setHidden(true);
    this.properties.push(Nam);
    
    let Ind = new propertie("index", "number", Index);
    Ind.setHidden(true);
    this.properties.push(Ind);
    
    let Pag = new propertie("page", "number", 0);
    Pag.setHidden(true);
    this.properties.push(Pag);
    
    let PosX = new propertie("posx", "number", 512 / 2);
    PosX.setMax(512);
    PosX.setStep(32);
    this.properties.push(PosX);
    
    let PosY = new propertie("posy", "number", 512 / 2);
    PosY.setMax(512);
    PosY.setStep(32);
    this.properties.push(PosY);
    
    let Rot = new propertie("rotation", "number", 0);
    Rot.setMax(360);
    Rot.setStep(22.5);
    this.properties.push(Rot);
    
    this.properties.push(new propertie("color", "color", "#b3b3b3"));
    
  }

  getE2Line(){ }

  render(){
    
    if(this.selected){
      
      strokeWeight(2);
      var strokeBrightness = random(0.8,1.2);
      stroke(80 * strokeBrightness,132 * strokeBrightness,255 * strokeBrightness);
      
    }
    else
    {
      
      noStroke();
      
    }
    
    
  }
  
}