class event{
  
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
  
  stylise(){
    
    let r = "";
    
    if(this.trigger == "if_first"){
      
      r += "If first -> ";
      
    }
    else if(this.trigger == "if_loop"){
      
      r += "If loop -> ";
      
    }
    else if(this.trigger == "if_click"){
      
      r += "If clicked -> ";
      
    }
    
    if(this.type == "change_text"){
      
      r += "change text of object n°" + this.get_propertie("egpObject") + " by '" + this.get_propertie("newText") + "' ";
      
    }
    else if(this.type == "change_color"){
      
      r += "change color of object n°" + this.get_propertie("egpObject") + " by '" + this.get_propertie("newColor") + "' ";
      
    }
    else if(this.type == "play_sound"){
      
      r += "Play '" + this.get_propertie("sound") + "' with pitch of : " + this.get_propertie("pitch");
      
    }
    else if(this.type == "change_page"){
      
      r += "Set page number to " + this.get_propertie("page");
      
    }
    
    return r;
    
  }
  
  getE2Line(){
    
    let r;
    
    if(this.type == "change_text"){
      
      r = 'Egp:egpSetText(' + this.get_propertie("egpObject") + ', ' + replaceString(this.get_propertie("newText")) + ')';
      
    }
    else if(this.type == "change_color"){
      
      r = 'Egp:egpColor(' + this.get_propertie("egpObject") + ', vec4(' + red(this.get_propertie("newColor")) + ', ' + green(this.get_propertie("newColor")) + ', ' + blue(this.get_propertie("newColor")) + ', ' + 255 + '))';
      
    }
    else if(this.type == "play_sound"){
      
      r = 'entity():soundPlay(0, 0, "' + this.get_propertie("sound") + '") soundPitch(0, ' + this.get_propertie("pitch") + ')';
      
    }
    else if(this.type == "change_page"){
      
      r = 'Egp:egpClear() ';
      r += 'Actual_page = ' + this.get_propertie("page");
      
    }
    
    return r;
    
  }
  
  
  constructor(Trigger, Type){
    
    this.trigger = Trigger;
    this.type = Type;
    this.triggerEgpObject = "";
    this.properties = [];
    
    if(this.type == "change_text"){
      
      this.properties.push(new propertie("egpObject", "egpObjectText", ""));
      this.properties.push(new propertie("newText", "string", ""));
      
    }
    else if(this.type == "change_color"){
      
      this.properties.push(new propertie("egpObject", "egpObject", ""));
      this.properties.push(new propertie("newColor", "color", ""));
      
    }
    else if(this.type == "play_sound"){
      
      this.properties.push(new propertie("sound", "string", ""));

      let Pitch = new propertie("pitch", "number", 100);
      Pitch.setMax(255);
      Pitch.setStep(5);
      this.properties.push(Pitch);
      
    }
    else if(this.type == "change_page"){
      
      this.properties.push(new propertie("page", "page", ""));
      
    }
    
    
  }

}