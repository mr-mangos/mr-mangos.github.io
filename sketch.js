let Page;
let Pages = [];
let selectedObject;
let selectedEvent;

function change_propertie(Name, Value) {

  selectedObject.set_propertie(Name, Value);

}

function change_event_propertie(Name, Value) {

  selectedEvent.set_propertie(Name, Value);

}

function refreshEventsList() {

  var ul = document.getElementById("events_list");
  ul.innerHTML = "";

  for (let i = 0; i < Page.events.length; i++) {

    var li = document.createElement("li");
    var p = Page.events[i];

    li.innerHTML = '<b class="ProText"> ' + p.stylise() + '</b><br><a onclick="removeEvent(' + i + ')">Remove</a> ';

    ul.append(li);

  }


}

function removeEvent(Index) {

  Page.events.splice(Index, 1);

  refreshEventsList();

}

function refreshEventsProperties() {

  var ul = document.getElementById("events_properties");
  ul.innerHTML = "";

  var et = document.getElementById("event_trigger");
  
  selectedEvent.triggerEgpObject = document.getElementById("event_trigger_object").value;

  if (et.value == "if_click") {

    let inp = document.getElementById("event_trigger_object");
    
    for (let i = 0; i < Page.egpObjects.length; i++) {

      let option = document.createElement("option");

      option.text = Page.egpObjects[i].get_propertie("name") + i;
      option.value = Page.egpObjects[i].get_propertie("index");
      inp.add(option);

    }

  }

  for (let i = 0; i < selectedEvent.properties.length; i++) {

    var li = document.createElement("li");
    var inp = document.createElement("input");
    var p = selectedEvent.properties[i];

    var n = p.name;
    var t = p.type;
    var v = p.value;

    li.innerHTML = '<b class="ProText"> ' + n + ' </b><br>';

    inp = document.createElement("input");
    inp.setAttribute("id", n);
    inp.setAttribute("oninput", "change_propertie('" + n + "', document.getElementById('" + n + "').value)");
    inp.setAttribute("value", v);

    if (t == "number") {

      inp.setAttribute("type", "range");
      inp.setAttribute("step", p.step);
      inp.setAttribute("min", p.min);
      inp.setAttribute("max", p.max);


    } else if (t == "egpObjectText") {

      inp = document.createElement("SELECT");

      for (let i = 0; i < Page.egpObjects.length; i++) {

        let option = document.createElement("option");

        option.text = Page.egpObjects[i].get_propertie("name") + i;
        option.value = Page.egpObjects[i].get_propertie("index");
        option.disabled = !(selectedEvent.type == "change_text" && Page.egpObjects[i].get_propertie("name") == "Text")
        inp.add(option);

      }

    } else if (t == "egpObject") {

      inp = document.createElement("SELECT");

      for (let i = 0; i < Page.egpObjects.length; i++) {

        let option = document.createElement("option");

        option.text = Page.egpObjects[i].get_propertie("name") + i;
        option.value = Page.egpObjects[i].get_propertie("index");
        inp.add(option);

      }

      } else if (t == "page") {

            inp = document.createElement("SELECT");

            for (let i = 0; i < Pages.length; i++) {

              let option = document.createElement("option");

              option.text = "Page" + i;
              option.value = i;
              inp.add(option);

      }
        
    }
    else if (t == "color") {

      inp.setAttribute("type", "color");

    }

    inp.setAttribute("id", n);
    inp.setAttribute("oninput", "change_event_propertie('" + n + "', document.getElementById('" + n + "').value)");

    li.append(inp);
    ul.appendChild(li);

    change_event_propertie(n, document.getElementById(n).value);

  }

}

function refreshEvent() {

  selectedEvent = new event(document.getElementById("event_trigger").value, document.getElementById("event_type").value);

  refreshEventsProperties();


}


function select_(egpObject) {

  selectedObject = null;
  document.getElementById("object_selected").options.length = 0;

  var ul = document.getElementById("properties");
  ul.innerHTML = ""

  for (let i = 0; i < Page.egpObjects.length; i++) {

    if (Page.egpObjects[i] == egpObject) {

      Page.egpObjects[i].selected = true;
      selectedObject = Page.egpObjects[i];

    } else {

      Page.egpObjects[i].selected = false;

    }

  }

  if (selectedObject != null) {

    /////////////

    for (let i = 0; i < Page.egpObjects.length; i++) {

      var x = document.getElementById("object_selected");
      var option = document.createElement("option");
      option.text = Page.egpObjects[i].get_propertie("name") + i;
      option.value = i;
      option.selected = (Page.egpObjects[i] == selectedObject);
      x.add(option);

    }






    ////////////

    for (let i = 0; i < selectedObject.properties.length; i++) {

      var p = selectedObject.properties[i];
      var h = p.hidden;

      if (!h) {

        var n = p.name;
        var t = p.type;
        var v = p.value;
        var m;

        var li = document.createElement("li");
        var inp = document.createElement("input");

        li.innerHTML = '<b class="ProText"> ' + n + ' </b><br>';

        inp.setAttribute("id", n);
        inp.setAttribute("oninput", "change_propertie('" + n + "', document.getElementById('" + n + "').value)");
        inp.setAttribute("value", v);

        if (t == "number") {

          inp.setAttribute("type", "range");
          inp.setAttribute("step", p.step);
          inp.setAttribute("min", p.min);
          inp.setAttribute("max", p.max);

        } else if (t == "color") {

          inp.setAttribute("type", "color");

        }

        li.append(inp);
        ul.appendChild(li);

      }

    }

  }

  refreshEventsProperties();

}

function newselect() {

  select_(Page.egpObjects[document.getElementById("object_selected").value]);

}


function delObject() {

  let toSelect;

  for (let i = 0; i < Page.egpObjects.length; i++) {

    if (Page.egpObjects[i].selected == true) {

      Page.egpObjects.splice(i, 1);

    } else {

      toSelect = Page.egpObjects[i];

    }

  }

  select_(toSelect);



}

function add_object(Class) {

  let Index = 1 + Page.egpObjects.length;

  if (Class == "box") {

    Page.egpObjects.push(new egpObjectBox(Index));

  } else if (Class == "roundedbox") {

    Page.egpObjects.push(new egpObjectRoundedBox(Index));

  } else if (Class == "circle") {

    Page.egpObjects.push(new egpObjectCircle(Index));

  } else if (Class == "text") {

    Page.egpObjects.push(new egpObjectText(Index));

  }

  Page.egpObjects[Page.egpObjects.length - 1].set_propertie("page", document.getElementById("pages").value);
  select_(Page.egpObjects[Page.egpObjects.length - 1]);

}

function replaceString(String) {

  r = '"' + String + '"';

  if (String.includes("{time}")) {

    r = String.replace("{time}", "time(\"hour\"):toString() + \":\" + time(\"min\"):toString() + \":\" + time(\"sec\"):toString()");

  }

  return r;

}


function generateCode() {

  let C = "";

  C += "@name Egp by EGPDesigner (K3CR4FT.:DLL)\n";
  C += "@inputs Egp:wirelink\n";
  C += "@persist [ Actual_page Egp_use ]:number [ Egp_cursor ]:vector2 [ Egp_user ]:entity \n\n";

  C += "function number wirelink:button(ID:number, Cursor:vector2){ local BPos = This:egpPos(ID) local BSize = This:egpSize(ID)/2 return inrange(Cursor,BPos-BSize,BPos+BSize) }\n\n";

  C += 'Egp_user = Egp["User", entity]\n';
  C += 'Egp_cursor = Egp:egpCursor(Egp_user)\n';
  C += 'Egp_use = Egp_user:keyUse()\n\n';

  C += "interval(1)\n\n";

  C += "if(first() || dupefinished()){\n\n";
  C += "    Egp:egpClear()\n\n";
  C += "    Actual_page = 0\n\n";
  C += "}\n\n";

  for (let i = 0; i < Pages.length; i++) {

    C += "if(changed(Actual_page) && Actual_page == " + i + "){\n\n";

    for (let k = 0; k < Pages[i].egpObjects.length; k++) {

      C += "    " + Pages[i].egpObjects[k].getE2Line() + "\n";

    }

    C += "\n";

    for (let e = 0; e < Pages[i].events.length; e++) {

      let event = Pages[i].events[e];

      if (event.trigger == "if_first") {

        C += "    " + event.getE2Line();

      }

    }

    C += "\n}\n\n";
    
    for (let e = 0; e < Pages[i].events.length; e++) {
      
      let event = Pages[i].events[e];

      if (event.trigger == "if_click") {

        C += 'if((changed(Egp_use) && Egp_use == 1 && Actual_page == ' + i + ') && Egp:button(' + event.triggerEgpObject + ', Egp_cursor)){ ';
        
        C += event.getE2Line();
        
        C += '}\n\n';

      }  
      
    }
    
    
    for (let e = 0; e < Pages[i].events.length; e++) {

      let event = Pages[i].events[e];

      if (event.trigger == "if_loop") {

        C += "if(Actual_page == " + i + "){\n\n";
        
        C += "    " + event.getE2Line();
        
        C += "}\n\n";

      }

    }

  }

  print(C);

}

function changePage() {

  let SP = document.getElementById("pages").value;

  document.getElementById("pages").options.length = 0;

  for (let i = 0; i < Pages.length; i++) {

    var x = document.getElementById("pages");
    var option = document.createElement("option");
    option.text = "Page" + i;
    option.value = i;
    option.selected = (i == SP);
    x.add(option);

  }

  Page = Pages[document.getElementById("pages").value];

  refreshEventsList();


}

function addEvent() {

  var c = true;

  for (let i = 0; i < selectedEvent.properties.length; i++) {

    if (selectedEvent.properties[i].value == "") {
      c = false;
    }

  }

  if (c) {

    Page.events.push(selectedEvent);

    refreshEventsList();

  }

}

function setup() {

  Pages.push(new page());
  Pages.push(new page());

  changePage();

  refreshEvent();

  createCanvas(512, 512);

}

function draw() {

  background(0);
  Page.render();

}