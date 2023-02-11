class egpObjectRoundedBox extends egpObject{

  constructor(Index){
    
    super(Index);
    
    this.set_propertie("name", "RoundedBox");
    
    let SizeX = new propertie("sizex", "number", 512 / 2);
    SizeX.setMax(512);
    SizeX.setStep(32);
    this.properties.push(SizeX);
    
    let SizeY = new propertie("sizey", "number", 512 / 2);
    SizeY.setMax(512);
    SizeY.setStep(32);
    this.properties.push(SizeY);


  }

  getE2Line(){
    
    let C = "";
    
    C += 'Egp:egpRoundedBox(' + this.get_propertie("index") + ', vec2(' + this.get_propertie("posx") + ', ' + this.get_propertie("posy") + '), vec2(' + this.get_propertie("sizex") + ', ' + this.get_propertie("sizey") + ')) ';
    
    C += 'Egp:egpColor(' + this.get_propertie("index") + ', vec4(' + red(this.get_propertie("color")) + ', ' + green(this.get_propertie("color")) + ', ' + blue(this.get_propertie("color")) + ', ' + 255 + ')) ';
    
    C += 'Egp:egpAngle(' + this.get_propertie("index") + ', ' + -this.get_propertie("rotation") + ')';
    
    
    return C;
    
  }
  
  render(){
    
    push();
    
    super.render();
    
    translate(this.get_propertie("posx"), this.get_propertie("posy"));
    rotate(PI / 180 * this.get_propertie("rotation"));
    
    fill(this.get_propertie("color"));
    
    rectMode(CENTER);
    rect(0, 0, this.get_propertie("sizex"), this.get_propertie("sizey"), 10);
    
    pop();
    
  }
  
}