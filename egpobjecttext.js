class egpObjectText extends egpObject{

  constructor(Index){
    
    super(Index);
    
    this.set_propertie("name", "Text");
    
    this.properties.push(new propertie("text", "string", "hello, world !"));

    let Size = new propertie("size", "number", 100);
    Size.setMax(255);
    Size.setStep(12.75);
    this.properties.push(Size);
    
  }

  getE2Line(){
    
    let C = "";
    
    C += 'Egp:egpText(' + this.get_propertie("index") + ', "' + this.get_propertie("text") + '", vec2(' + this.get_propertie("posx") + ', ' + this.get_propertie("posy") + ')) ';
    
    C += 'Egp:egpColor(' + this.get_propertie("index") + ', vec4(' + red(this.get_propertie("color")) + ', ' + green(this.get_propertie("color")) + ', ' + blue(this.get_propertie("color")) + ', ' + 255 + ')) ';
    
    C += 'Egp:egpAngle(' + this.get_propertie("index") + ', ' + -this.get_propertie("rotation") + ') ';
    C += 'Egp:egpSize(' + this.get_propertie("index") + ', ' + this.get_propertie("size") + ') ';
    
    C += 'Egp:egpAlign(' + this.get_propertie("index") + ', 1, 1) ';
    
    return C;
    
  }
  
  render(){
    
    push();
    
    super.render();
    
    translate(this.get_propertie("posx"), this.get_propertie("posy"));
    rotate(PI / 180 * parseInt(this.get_propertie("rotation")));
    
    fill(this.get_propertie("color"));
    
    textAlign(CENTER, CENTER);
    textSize( parseInt(this.get_propertie("size")));
    text(this.get_propertie("text"), 0, 0);
    
    pop();
    
  }
  
}