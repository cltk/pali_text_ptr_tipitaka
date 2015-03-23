var defcolor = new Array;
defcolor['coltext'] = '#7F4C00';
defcolor['colsel'] = '#FFFF00';

defcolor['coldppn'] = '#00B900';
defcolor['colped'] = '#CC4400';
defcolor['colcpd'] = '#5353D5';

defcolor['colbk1'] = 'yellow';
defcolor['colbk1'] = 'aqua';
defcolor['colbk3'] = 'chartruese';

defcolor['green'] = '#00B900';
defcolor['blue'] = '#5353D5';
defcolor['brown'] = '#000000';
defcolor['grey'] = 'grey';
defcolor['red'] = 'red';

defcolor['blueh'] = 'powderblue';


var colorcfg = new Array;
colorcfg['coltext'] = defcolor['coltext']
colorcfg['colsel'] = defcolor['colsel']

colorcfg['coldppn'] = defcolor['coldppn']
colorcfg['colped'] = defcolor['colped']
colorcfg['colcpd'] = defcolor['colcpd']

colorcfg['colbk1'] = defcolor['colbk1']
colorcfg['colbk2'] = defcolor['colbk2']
colorcfg['colbk3'] = defcolor['colbk3']

colorcfg['green'] = defcolor['green']
colorcfg['blue'] = defcolor['blue']
colorcfg['brown'] = defcolor['brown']
colorcfg['grey'] = defcolor['grey']
colorcfg['red'] = defcolor['red']

colorcfg['blueh'] = defcolor['blueh']



var dfmove = new Array; // edit this to suit your monitor
dfmove[0] = 40; // used for the height of the analysis bar in the middle of the screen
dfmove[1] = 220; // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
dfmove[2] = 254; // used for the width of the control box on the right side of the screen.
dfmove[3] = 50; // used for the height of the search box (hidden)

var minmove = new Array; // minimum values
minmove[0] = 40; // used for the height of the analysis bar in the middle of the screen
minmove[1] = 0; // used for the height of the bottom box containing the dictionary, scratchpad and convertpad
minmove[2] = 254; // used for the width of the control box on the right side of the screen.
minmove[3] = 50; // used for the height of the search box (hidden)


var confmove = [];
for (i in dfmove) confmove.push(dfmove[i]);

var doca = document.all;

function getconfig() {
	var ca = document.cookie.split('; ');
	var name = '';
	var name2 = '';
	for(var i=0;i < ca.length;i++) 
	{
		if (ca[i].substring(0,3) == 'DCF') // move
		{
			name = ca[i].split('=')[0].substring(3);
            name2 = ca[i].split('=')[1];
            confmove[name] = parseInt(name2);
		}
		else if (ca[i].substring(0,3) == 'DCO') // color
		{
			name = ca[i].split('=')[0].substring(3);
            name2 = ca[i].split('=')[1];
            colorcfg[name] = name2;
		}
	}
	var colchanges = document.getElementsByName('changecolor');
	for(var i=0;i < colchanges.length;i++)
	{
		colchanges[i].style.color=colorcfg['coltext'];
	} 
}

function setconfmove() {
    var newmove = [];
    newmove.push(document.getElementById('confanf').value);
    newmove.push(document.getElementById('confbf').value);
    newmove.push(document.getElementById('confrf').value);

	for(i in newmove) if (!newmove[i]) newmove[i] = confmove[i];

    if ((parseInt(newmove[0]) + parseInt(newmove[1])) > window.innerHeight) {
        newmove[0] = Math.round((newmove[0]*(window.innerHeight))/(parseInt(newmove[0]) + parseInt(newmove[1])));
        newmove[1] = (window.innerHeight) - newmove[0];
    }
    if (newmove[2] > window.innerWidth/2) newmove[2] = window.innerWidth/2;
	for(i in newmove) 
	{
        if (newmove[i] >= minmove[i]) createCookie('DCF'+i,newmove[i],36500);
        else createCookie('DCF'+i,minmove[i],36500);
	}
    moveframex(2);
    showconfig();
}
function resetconfig() {
    confmove = [];
    for (i in dfmove) confmove.push(dfmove[i]);
	for(i in confmove) 
	{
        createCookie('DCF'+i,confmove[i],36500);
	}
    moveframex(2);
}

function setcolor() {
	var inputs = document.getElementById('configform').getElementsByTagName('input');
	for (i = 0; i < inputs.length; i++) {
		if (inputs[i].id) {
			createCookie('DCO' +inputs[i].id,inputs[i].value,36500);
		}
	}
	location.replace('index.htm')
}
function resetcolor() {
	var date = new Date();
	date.setTime(date.getTime())-(2*24*60*60*1000);
	var expires = "; expires="+date.toGMTString();
	
	var ca = document.cookie.split('; ');
	for(var i=0;i < ca.length;i++) 
	{
		if (ca[i].substring(0,3) == 'DCO') // color
		{
			document.cookie = ca[i]+expires+"; path=/";
		}
	}
	location.replace('index.htm')
}


function showconfig() {
    var winW = window.innerWidth;
    var winH = window.innerHeight;
    document.getElementById('mafa').innerHTML = '';
    document.getElementById('mafb').innerHTML = '<table style="width:' + (winW-confmove[2]-100) + 'px"><tr><td colspan=2 align=center><b>Configuration</b></td></tr><tr><td><p align=center><b>Size</b></p><p><form name="configform"><table border=1 height="' + (winH/2.5) + '"><tr><td width="' + ((winW-confmove[2])/2.5) + '" align=center>(<i>auto</i>)</td><td align=center rowspan=3 width="' + (confmove[2]/2.5) + '">W<br><input id="confrf" value="'+confmove[2]+'" type=input maxlength=4 size=4 title="Enter desired width"></td></tr><tr><td align=center height="' + (confmove[0]/2.5) + '">H <input id="confanf" value="'+confmove[0]+'" type=input maxlength=4 size=4 title="Enter desired height"></td></tr><tr><td align=center height="' + (confmove[1]/2.5) + '">H <input id="confbf" value="'+confmove[1]+'" type=input maxlength=4 size=4 title="Enter desired height"></td></tr></table></p><p><input type=button value="Reset" title="Reset configuration" onclick="resetconfig()"><input type=button value="Set" title="Set configuration" onclick="setconfmove()"></p></form></td><td align=center><form id="configform"><p align=center><b>Color</b></p><p style="color:'+colorcfg['coltext']+'" id="col1">Text: <input name="color" id="coltext" value="'+colorcfg['coltext']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col1\').style.color=this.value;"><br><p style="color:'+colorcfg['colsel']+'" id="col2"><b>Selected: </b><input name="color" id="colsel" value="'+colorcfg['colsel']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col2\').style.color=this.value;"><br><p style="color:'+colorcfg['colped']+'" id="col3"><b>PED: </b><input name="color" id="colped" value="'+colorcfg['colped']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col3\').style.color=this.value;"><p style="color:'+colorcfg['coldppn']+'" id="col4"><b>DPPN: </b><input name="color" id="coldppn" value="'+colorcfg['coldppn']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col4\').style.color=this.value;"><p style="color:'+colorcfg['colcpd']+'" id="col5"><b>CPD: </b><input name="color" id="colcpd" value="'+colorcfg['colcpd']+'" type=input size=7 title="Enter desired color" onkeyup="document.getElementById(\'col5\').style.color=this.value;"><p><input type=button value="Reset" title="Reset configuration" onclick="resetcolor()"><input type=button value="Set" title="Set configuration" onclick="setcolor()"></p></td></tr></table>';
}

