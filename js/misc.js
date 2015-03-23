
function moveframex(a) //read, etc
{
    getconfig();
    document.getElementById('left').style.right = (confmove[2]-4) + 'px';
    document.getElementById('search').style.right = (confmove[2]-4) + 'px';
    document.getElementById('right').style.width = confmove[2] + 'px';
    document.getElementById('anf').style.height = confmove[0] + 'px';
    document.getElementById('searcht').style.height = confmove[3] + 'px';
    moves(0);

	if (a==1) { //read
		document.getElementById('maf').style.display = 'block';
		document.getElementById('leftbot').style.display = 'none';
        
		document.getElementById('maf').style.bottom = (confmove[0]-4) + 'px';
		document.getElementById('anf').style.bottom = '-10px';
		document.getElementById('anf').style.top = '';
	}
	else if (a==2) { //normal view
		document.getElementById('maf').style.display = 'block';
		document.getElementById('leftbot').style.display = 'block';

		document.getElementById('maf').style.bottom = (confmove[0] + confmove[1] + 16) + 'px';
		document.getElementById('leftbot').style.bottom = '0px';
		document.getElementById('leftbot').style.height = confmove[1] + 'px';
		document.getElementById('anf').style.bottom = (confmove[1]-4) + 'px';
		document.getElementById('anf').style.top = '';

		document.getElementById('leftbot').style.top = '';
	}
	else if (a==3) { // dict
        moveframey('dif'); // switch to dict
        
		document.getElementById('maf').style.display = 'none';
		document.getElementById('leftbot').style.display = 'block';

		document.getElementById('leftbot').style.height = 'auto';
        document.getElementById('leftbot').style.top = (confmove[0]+4) + 'px';
		document.getElementById('leftbot').style.bottom = '0px';
		

		
        document.getElementById('anf').style.top = '-10px';
		document.getElementById('anf').style.bottom = '';
	}
}

function moveframey(a) //dict, conv, or scratch
{
	moveframex(2)
	if (a=='dif') a = 'cdif';
    document.getElementById('cdif').style.display="none";
	document.getElementById('cof').style.display="none";
	document.getElementById('scf').style.display="none";
	document.getElementById(a).style.display="block";
}

function moveframet(a) // open close control panel
{
	if (a == 0) { // close
		document.getElementById('right').style.display="none";
		document.getElementById('left').style.right='0px';
	}
	else { // open
		document.getElementById('right').style.display='block';
		document.getElementById('left').style.right=confmove[2]+'px';	
	}
}

function moves(a) // search open
{
	if (a == 1) {
		moveframet(1);
		document.getElementById('plus').innerHTML = '<input type="button" value="-" title="minimize search frame" onClick="moves(0)">';
		document.getElementById('search').style.display="block";
	}
	else {
		document.getElementById('plus').innerHTML = '<input type="button" value="+" title="maximize search frame" onClick="moves(1)">';
		document.getElementById('search').style.display="none";
	}
}

function scrolldown(much)
{
	if (much == 'alert')
	{
		//alert('Scroll distance = ' + document.getElementById('maf').scrollTop);
		scrollmuch=document.getElementById('maf').scrollTop;
	}
	else document.getElementById('maf').scrollTop=much;
}

function getlink(which)
{
	var linkfile = which + '.htm';
	parent.mainFrame.location = linkfile;
	scrollmuch = bookmarklink[which-1];
}

function changelang(lang) {
	var langc = document.getElementById('lang').value;
	parent.mainFrame.yt = eval('parent.mainFrame.'+langc+'t');
}

function go_anchor(mydiv,n){
    document.getElementById(mydiv).scrollTop = document.getElementById(n).offsetTop;
}
