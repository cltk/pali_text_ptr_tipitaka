var niknoname = new Array();
niknoname[0] = "Vin";
niknoname[1] = "DN";
niknoname[2] = "MN";
niknoname[3] = "SN";
niknoname[4] = "AN";
niknoname[5] = "KN";
niknoname[6] = "KN";
niknoname[7] = "Vism";

var bookmarklink = new Array();
bookmarklink[0] = 100; // scroll distance for 1.htm
bookmarklink[1] = 0; // scroll distance for 2.htm
bookmarklink[2] = 3529; // scroll distance for 3.htm

var scrollmuch = 500; // default scroll distance 

var bookmarkwhere = new Array();
bookmarkwhere['a'] = '3#2#4#2';

function bookmarkf(let)
{
	var bmwa = bookmarkwhere[let].split('#');

	getplace(bmwa);
	importXML();
	document.getElementById('maf').scrollTop = bookmarklink[3];
}

function bookmarkc(let)
{
	if(let)
	{
		var name = let;
	}
	else 
	{
		var nameno = document.form.bmlist.selectedIndex;
		var name = document.form.bmlist.getElementsByTagName('option')[nameno].value;
		if (nameno == 0) return;
	}
	document.form.bmname.value = name;
	var bmx = '';
	
	// first move to the file using the DPR cookie
	
	var nameEQ = 'DPR' + name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) 
		{
			bmx = c.substring(nameEQ.length,c.length);
			break;
		}
	}		

	var bmwa = bmx.split('#');
	
	getplace(bmwa);
	importXML();

	// next scroll using the DSC cookie
	
	var nameEQ2 = 'DSC' + name + "=";
	var ca2 = document.cookie.split(';');
	for(var j=0;j < ca2.length;j++) {
		var c2 = ca2[j];
		while (c2.charAt(0)==' ') c2 = c2.substring(1,c2.length);
		if (c2.indexOf(nameEQ2) == 0) 
		{
			bmx = c2.substring(nameEQ2.length,c2.length);
		}
	}		
		document.getElementById('maf').scrollTop = bmx;
}

function bookmarks(let)
{
	var bookmarktemp = document.form.nik.selectedIndex + '#' + document.form.book.selectedIndex  + '#' + document.form.meta.selectedIndex  + '#' + document.form.volume.selectedIndex  + '#' + document.form.vagga.selectedIndex  + '#' + document.form.sutta.selectedIndex + '#' + document.form.section.selectedIndex + '#' + document.form.hier.value;
	
	// create first cookie for page
	
	var nameadd = document.form.bmname.value;
	nameadd = nameadd.replace(/"/g, '`');
	if (nameadd == 'showcookies') 
	{
		showmeallthecookies();
	}
	else if (nameadd == 'erasecookies') 
	{
		erasecookies();
	}
	else
	{
		//if (nameadd.length > 20) nameadd = nameadd.substring(0,20);
		if (nameadd.length == 0)
		{
			alert('Please enter a name for the bookmark');
			return null;
		}
		createCookie('DPR' + nameadd,bookmarktemp,36500);
		
		// create second cookie for scroll distance
		
		var cookscroll = document.getElementById('maf').scrollTop; // scroll distance for bookmark
		createCookie('DSC' + nameadd,cookscroll,36500);
		
		// create third cookie for description 
		
		var desquote = replacevelstandard(document.getSelection());
		
		desquote = desquote.replace(/;/g, "::");
		if (desquote) createCookie('DES' + nameadd,desquote,36500);
		else createCookie('DES' + nameadd,'no description',36500);
	
		// update cookie list in javascript.htm
		
		updatecookielist();
	}		
}

function showmeallthecookies()
{
	var ca = document.cookie.split('; ');
		var name = '';
		var allcookies = '<form name="bkform"><h1>DPR Bookmarks</h1><table>';
	
		var numberb = 0;
		var cookietotalno = 0;
		for(var i=0;i < ca.length;i++) 
		{
			if (ca[i].substring(0,3) == 'DPR')
			{
				cookietotalno++;
				allcookies +=  '<tr><td>' + ca[i];
				
			}

		}
	if (cookietotalno == 1)  allcookies += '<hr><b>' + cookietotalno + ' Bookmark Stored</b>';
	else allcookies += '<hr><b>' + cookietotalno + ' Bookmarks Stored</b>';
	document.getElementById('mafa').innerHTML = '';
	document.getElementById('mafb').innerHTML = allcookies;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function updatecookielist()
{
	var ca = document.cookie.split('; ');
	var name = '';
	var name2 = '';
	for(var i=0;i < ca.length;i++) 
	{
		if (i == 0) {
			if (ca.length > 1) var allcookies = '<option>select one</option>';
			else var allcookies = '<option>none</option>';
		}
		if (ca[i].substring(0,3) == 'DPR')
		{
			
			name = ca[i].split('=')[0].substring(3);
			if (name.length > 13) name2 = name.substring(0,10) + '...';
			else name2 = name;
			allcookies +=  '<option value="' + name + '">' + name2 + '</option>';
		}
	}
	document.form.bmlist.innerHTML = allcookies;	
}

function erasecookie(name)
{
	if (name)
	{
		var refreshbms = true;
	}
	else
	{
		var nameno = document.form.bmlist.selectedIndex;
		var name = document.form.bmlist.getElementsByTagName('option')[nameno].value;
	}	
	var answer = confirm('Are you sure you want to erase the bookmark "' + name + '"?')
	if(answer) 
	{	
		var nameEQ = 'DPR' + name;
		var nameEQS = 'DSC' + name;
		var nameEQD = 'DES' + name;
		var date = new Date();
			date.setTime(date.getTime())-(2*24*60*60*1000);
			var expires = "; expires="+date.toGMTString();
		
		document.cookie = nameEQ+"=a"+expires+"; path=/";
		document.cookie = nameEQS+"=a"+expires+"; path=/";
		document.cookie = nameEQD+"=a"+expires+"; path=/";
		
		updatecookielist();
		
		if (refreshbms)
		{
			bookmarkframe('refresh');
		}
	}
}

function erasecookies(gofrom)
{
	var answer = confirm('Are you sure you want to erase all of the stored bookmarks?')
	if(answer) 
	{	
		var ca = document.cookie.split(';');
		var name = '';
		var date = new Date();
			date.setTime(date.getTime())-(2*24*60*60*1000);
			var expires = "; expires="+date.toGMTString();
		for(var i=0;i < ca.length;i++) 
		{
            name = ca[i].split('=')[0];
			if (name.substring(0,3) == 'DPR' || name.substring(0,3) == 'DSC' || name.substring(0,3) == 'DES') document.cookie = name+"=a"+expires+"; path=/";
		}
		updatecookielist();
		if (gofrom) bookmarkframe('refresh');
	}
}

function bookmarkframe(refresh)
{
	moveframex('*',confmove[0],confmove[1],0);
	var ca = document.cookie.split('; ');
	ca = ca.sort();
	if (ca.length < 2)
	{
		if (refresh) // coming from the erase function
		{
			document.getElementById('mafa').innerHTML = '';
			document.getElementById('mafb').innerHTML='<div  id = "c" align=center><br><br><h1>no bookmarks saved</h1>';
		}
		else alert('no bookmarks saved');
	}
	else
	{
		var name = '';
		var cloc = new Array();
		
		var numberb = 0;
		var cookietotalno = 0;	
		
		var allcookies = '<form name="bkform"><h2>DPR Bookmarks</h2><table width=100% border=0>';
	
		for(var i=0;i < ca.length;i++) 
		{
			numberb++;
			if (ca[i].substring(0,3) == 'DPR')
			{
				cookietotalno++;
				name = ca[i].split('=')[0].substring(3);
				name = name.replace(/"/g, '`');
				cloc = ca[i].split('=')[1].split('#');
				cloc[1]++;
				cloc[2]++;
				cloc[3]++;
				cloc[4]++;
				cloc[5]++;
				cloc[6]++;
				if (cloc[7] == 'm') cloc[7] = 'att';
				else cloc[7] = 'mul';
				
				allcookies +=  '<tr><td><table width=100%><tr><td class="blueh"><b><a href="javascript:void(0)" onclick="bookmarkc(\'' + name + '\')">' + cookietotalno + '. ' + name + ' </b>('+ niknoname[cloc[0]] + '.' + cloc[1] + '.' + cloc[2] + '.' + cloc[3] + '.' + cloc[4] + '.' + cloc[5] + '.' + cloc[6] + ' - ' + cloc[7] + ')</a></td><td align=right width="64" class="blueh"><input value="+" title="click here to edit this bookmark" type="button" id="hiderbutton' + name + '" onClick="hiddenout(\'' + name + '\')"><input value="x" type="button" onClick="erasecookie(\'' + name + '\')"><tr><td><i><font id="title' + name + '">&nbsp;</font></i></tr></table></td></tr>';
				allcookies +=  '<tr><td><div class="hide" id="'+ name + '"><table width=100%><tr bgcolor="chartreuse"><td align=center><b>Old Name</b><td align=center><b>New Name</b><td><tr><td align=center>' + name + '<td align=center><input type=text value="" id="newname' + name + '" title="Enter a new name for this bookmark (max. 10 chars)" size=12><td align=center><input type=button value=change onClick="bookmarkxn(\'' + name + '\')" title="Change Name"></table></div></td></tr>';
				allcookies += '<tr><td align=center><div class="hide" id="html' + name + '"></div></tr></table></td></tr>';
					
			}	
		}
		allcookies += '</table></form>';
		if (cookietotalno == 1)  allcookies += '<hr><b>' + cookietotalno + ' Bookmark Stored</b>';
		else allcookies += '<hr><b>' + cookietotalno + ' Bookmarks Stored</b>';
		allcookies += ' - <input type="button" value="erase all" title="erase all stored bookmarks" onclick="erasecookies(\'go\')"> <input type="button" value="showdata" title="show data for all bookmarks" onclick="showmeallthecookies(\'go\')">';
		document.getElementById('mafa').innerHTML = '';
		document.getElementById('mafb').innerHTML = allcookies;
		
		// now add the descriptions
		
		var desc = '';
		var title = '';
		var html = '';
				
		for(var i=0;i < ca.length;i++) 
		{
			if (ca[i].substring(0,3) == 'DES')
			{
				name = ca[i].split('=')[0].substring(3);
				desc = replaceunistandard(ca[i].split('=')[1]);
				desc = desc.replace(/::/g, ";");

				html = 'html' + name;
				title = 'title' + name;
				
				document.getElementById(html).innerHTML = '<table width=100%><tr bgcolor="yellow"><td><b>Old Description</b><td align=center><b>New Description</b><td><tr><td align=center id="olddesc' + name + '">' + desc + '<td align=center><textarea id="newdesc' + name + '" title="Enter a new description for this bookmark" value="' + desc + '"></textarea><td><input type="button" value="change" onClick="bookmarkxd(\'' + name + '\')" title="Change Description"></table>';
				document.getElementById(title).innerHTML = desc;
			}		
		}
	}
	if (!refresh) document.getElementById('maf').scrollTop = 0;

}


function bookmarkxd(name)
{
	var descloc = 'newdesc' + name;
	var desc = document.getElementById(descloc).value;
	desc = desc.replace(/\n/g, ' | ');
	createCookie('DES' + name, desc, 36500);
	bookmarkframe();
}
function bookmarkxn(name)
{
	var namloc = 'newname' + name;
	var nam = document.getElementById(namloc).value;

	var nameEQ = 'DPR' + name;
	var nameEQS = 'DSC' + name;
	var nameEQD = 'DES' + name;
	
	var ca = document.cookie.split('; ');
	
	var passvalue = '';
	var passvalueS = '';
	var passvalueD = '';
	
	var casub = '';
	for(var i=0;i < ca.length;i++) 
	{
		casub = ca[i].split('=')[0];
		if (casub == nameEQ) passvalue = ca[i].split('=')[1];
		if (casub == nameEQS) passvalueS = ca[i].split('=')[1];
		if (casub == nameEQD) passvalueD = ca[i].split('=')[1];
	}
	
	// create the new cookies
	
	createCookie('DPR' + nam, passvalue, 36500);
	createCookie('DSC' + nam, passvalueS, 36500);
	createCookie('DES' + nam, passvalueD, 36500);
	
	// delete the old cookies
	
	createCookie('DPR' + name, nam, -1);
	createCookie('DSC' + name, nam, -1);
	createCookie('DES' + name, nam, -1);
	
	bookmarkframe();
	updatecookielist();
}

function bookmarksite(title, url){
if (document.all)
window.external.AddFavorite(url, title);
else if (window.sidebar)
window.sidebar.addPanel(title, url, "")
}
