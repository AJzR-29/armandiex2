document.addEventListener('DOMContentLoaded', function () {

  var API_KEY = '27efeb9368c8c4d45c578bb7d0136365';
  var BASE    = 'https://api.the-odds-api.com/v4';
  var ESPN    = 'https://site.api.espn.com/apis/site/v2/sports';
  var ESPN3   = 'https://site.api.espn.com/apis/common/v3/sports';

  var TEAM_STADIUM = {
    "Arizona Diamondbacks":  { name:"Chase Field",              coords:[33.4453,-112.0667], pf:1.04 },
    "Atlanta Braves":        { name:"Truist Park",              coords:[33.8907,-84.4677],  pf:1.02 },
    "Baltimore Orioles":     { name:"Oriole Park",              coords:[39.2838,-76.6215],  pf:1.07 },
    "Boston Red Sox":        { name:"Fenway Park",              coords:[42.3467,-71.0972],  pf:1.10 },
    "Chicago Cubs":          { name:"Wrigley Field",            coords:[41.9484,-87.6553],  pf:1.08 },
    "Chicago White Sox":     { name:"Guaranteed Rate Field",    coords:[41.8299,-87.6338],  pf:1.05 },
    "Cincinnati Reds":       { name:"Great American Ball Park", coords:[39.0979,-84.5082],  pf:1.11 },
    "Cleveland Guardians":   { name:"Progressive Field",        coords:[41.4962,-81.6852],  pf:0.97 },
    "Colorado Rockies":      { name:"Coors Field",              coords:[39.7561,-104.9942], pf:1.35 },
    "Detroit Tigers":        { name:"Comerica Park",            coords:[42.3390,-83.0485],  pf:0.95 },
    "Houston Astros":        { name:"Minute Maid Park",         coords:[29.7572,-95.3555],  pf:1.03 },
    "Kansas City Royals":    { name:"Kauffman Stadium",         coords:[39.0517,-94.4803],  pf:0.97 },
    "Los Angeles Angels":    { name:"Angel Stadium",            coords:[33.8003,-117.8827], pf:1.01 },
    "Los Angeles Dodgers":   { name:"Dodger Stadium",           coords:[34.0736,-118.2402], pf:1.02 },
    "Miami Marlins":         { name:"loanDepot park",           coords:[25.7781,-80.2197],  pf:0.87 },
    "Milwaukee Brewers":     { name:"American Family Field",    coords:[43.0280,-87.9712],  pf:1.02 },
    "Minnesota Twins":       { name:"Target Field",             coords:[44.9817,-93.2781],  pf:0.99 },
    "New York Mets":         { name:"Citi Field",               coords:[40.7571,-73.8458],  pf:0.96 },
    "New York Yankees":      { name:"Yankee Stadium",           coords:[40.8296,-73.9262],  pf:1.05 },
    "Oakland Athletics":     { name:"Oakland Coliseum",         coords:[37.7516,-122.2005], pf:0.92 },
    "Philadelphia Phillies": { name:"Citizens Bank Park",       coords:[39.9061,-75.1665],  pf:1.08 },
    "Pittsburgh Pirates":    { name:"PNC Park",                 coords:[40.4469,-80.0057],  pf:0.99 },
    "San Diego Padres":      { name:"Petco Park",               coords:[32.7077,-117.1569], pf:0.84 },
    "San Francisco Giants":  { name:"Oracle Park",              coords:[37.7786,-122.3893], pf:0.90 },
    "Seattle Mariners":      { name:"T-Mobile Park",            coords:[47.5914,-122.3325], pf:0.93 },
    "St. Louis Cardinals":   { name:"Busch Stadium",            coords:[38.6226,-90.1928],  pf:0.99 },
    "Tampa Bay Rays":        { name:"Tropicana Field",          coords:[27.7683,-82.6534],  pf:0.94 },
    "Texas Rangers":         { name:"Globe Life Field",         coords:[32.7512,-97.0832],  pf:1.07 },
    "Toronto Blue Jays":     { name:"Rogers Centre",            coords:[43.6414,-79.3894],  pf:1.03 },
    "Washington Nationals":  { name:"Nationals Park",           coords:[38.8730,-77.0074],  pf:1.00 }
  };

  var NBA_TEAMS = ['Atlanta Hawks','Boston Celtics','Brooklyn Nets','Charlotte Hornets','Chicago Bulls','Cleveland Cavaliers','Dallas Mavericks','Denver Nuggets','Detroit Pistons','Golden State Warriors','Houston Rockets','Indiana Pacers','Los Angeles Clippers','Los Angeles Lakers','Memphis Grizzlies','Miami Heat','Milwaukee Bucks','Minnesota Timberwolves','New Orleans Pelicans','New York Knicks','Oklahoma City Thunder','Orlando Magic','Philadelphia 76ers','Phoenix Suns','Portland Trail Blazers','Sacramento Kings','San Antonio Spurs','Toronto Raptors','Utah Jazz','Washington Wizards'];
  var MLB_TEAMS = ['Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox','Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Guardians','Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals','Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers','Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics','Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants','Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers','Toronto Blue Jays','Washington Nationals'];

  var LEAGUES = {
    soccer: [
      { key:'soccer_uefa_champs_league',               title:'🏆 UEFA Champions League' },
      { key:'soccer_uefa_champs_league_qualification', title:'🏆 UCL Clasificación' },
      { key:'soccer_uefa_europa_league',               title:'🏆 UEFA Europa League' },
      { key:'soccer_uefa_europa_conference_league',    title:'🏆 UEFA Conference League' },
      { key:'soccer_epl',                              title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
      { key:'soccer_efl_champ',                        title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 Championship' },
      { key:'soccer_fa_cup',                           title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 FA Cup' },
      { key:'soccer_spain_la_liga',                    title:'🇪🇸 La Liga' },
      { key:'soccer_spain_segunda_division',           title:'🇪🇸 La Liga 2' },
      { key:'soccer_germany_bundesliga',               title:'🇩🇪 Bundesliga' },
      { key:'soccer_germany_bundesliga2',              title:'🇩🇪 Bundesliga 2' },
      { key:'soccer_italy_serie_a',                    title:'🇮🇹 Serie A' },
      { key:'soccer_france_ligue_one',                 title:'🇫🇷 Ligue 1' },
      { key:'soccer_portugal_primeira_liga',           title:'🇵🇹 Primeira Liga' },
      { key:'soccer_netherlands_eredivisie',           title:'🇳🇱 Eredivisie' },
      { key:'soccer_belgium_first_div',                title:'🇧🇪 First Division A' },
      { key:'soccer_turkey_super_league',              title:'🇹🇷 Süper Lig' },
      { key:'soccer_conmebol_copa_libertadores',       title:'🌎 Copa Libertadores' },
      { key:'soccer_conmebol_copa_sudamericana',       title:'🌎 Copa Sudamericana' },
      { key:'soccer_argentina_primera_division',       title:'🇦🇷 Primera División' },
      { key:'soccer_brazil_campeonato',                title:'🇧🇷 Brasileirão' },
      { key:'soccer_chile_campeonato',                 title:'🇨🇱 Primera Chile' },
      { key:'soccer_mexico_ligamx',                    title:'🇲🇽 Liga MX' },
      { key:'soccer_usa_mls',                          title:'🇺🇸 MLS' },
      { key:'soccer_saudi_arabia_pro_league',          title:'🇸🇦 Saudi Pro League' },
      { key:'soccer_japan_j_league',                   title:'🇯🇵 J League' },
      { key:'soccer_australia_aleague',                title:'🇦🇺 A-League' },
      { key:'soccer_fifa_club_world_cup',              title:'🌍 FIFA Club World Cup' }
    ],
    basketball: [
      { key:'basketball_nba',           title:'🇺🇸 NBA',           staticTeams: NBA_TEAMS },
      { key:'basketball_nba_preseason', title:'🇺🇸 NBA Preseason', staticTeams: NBA_TEAMS },
      { key:'basketball_wnba',          title:'🇺🇸 WNBA' },
      { key:'basketball_ncaab',         title:'🇺🇸 NCAA Basketball' },
      { key:'basketball_euroleague',    title:'🇪🇺 EuroLeague' },
      { key:'basketball_nbl',           title:'🇦🇺 NBL Australia' }
    ],
    baseball: [
      { key:'baseball_mlb',            title:'⚾ MLB',           staticTeams: MLB_TEAMS, panel: true },
      { key:'baseball_mlb_preseason',  title:'⚾ MLB Preseason', staticTeams: MLB_TEAMS, panel: true },
      { key:'baseball_ncaa',           title:'🎓 NCAA Béisbol',                          panel: true },
      { key:'baseball_npb',            title:'🇯🇵 NPB Japón' },
      { key:'baseball_kbo',            title:'🇰🇷 KBO Corea' }
    ]
  };

  var ESPN_LEAGUE_MAP = {
    soccer_epl:{ sport:'soccer',league:'eng.1' }, soccer_spain_la_liga:{ sport:'soccer',league:'esp.1' },
    soccer_spain_segunda_division:{ sport:'soccer',league:'esp.2' }, soccer_germany_bundesliga:{ sport:'soccer',league:'ger.1' },
    soccer_germany_bundesliga2:{ sport:'soccer',league:'ger.2' }, soccer_italy_serie_a:{ sport:'soccer',league:'ita.1' },
    soccer_france_ligue_one:{ sport:'soccer',league:'fra.1' }, soccer_portugal_primeira_liga:{ sport:'soccer',league:'por.1' },
    soccer_netherlands_eredivisie:{ sport:'soccer',league:'ned.1' }, soccer_belgium_first_div:{ sport:'soccer',league:'bel.1' },
    soccer_turkey_super_league:{ sport:'soccer',league:'tur.1' }, soccer_spl:{ sport:'soccer',league:'sco.1' },
    soccer_usa_mls:{ sport:'soccer',league:'usa.1' }, soccer_mexico_ligamx:{ sport:'soccer',league:'mex.1' },
    soccer_brazil_campeonato:{ sport:'soccer',league:'bra.1' }, soccer_argentina_primera_division:{ sport:'soccer',league:'arg.1' },
    soccer_chile_campeonato:{ sport:'soccer',league:'chi.1' }, soccer_uefa_champs_league:{ sport:'soccer',league:'UEFA.Champions_League' },
    soccer_uefa_europa_league:{ sport:'soccer',league:'UEFA.Europa_League' }, soccer_conmebol_copa_libertadores:{ sport:'soccer',league:'conmebol.libertadores' },
    basketball_nba:{ sport:'basketball',league:'nba' }, basketball_nba_preseason:{ sport:'basketball',league:'nba' },
    basketball_wnba:{ sport:'basketball',league:'wnba' }, basketball_ncaab:{ sport:'basketball',league:'mens-college-basketball' },
    baseball_mlb:{ sport:'baseball',league:'mlb' }, baseball_mlb_preseason:{ sport:'baseball',league:'mlb' },
    baseball_ncaa:{ sport:'baseball',league:'college-baseball' }
  };

  var eventsCache   = [];
  var espnTeamsMap  = {};
  var espnDataCache = {};
  var scanResults   = [];
  var evMinActive   = 0;
  var windCache     = {};
  var pitchersCache = null;
  var mlbStatsCache = null;

  var sportSelect  = document.getElementById('sportSelect');
  var leagueSelect = document.getElementById('leagueSelect');
  var teamA        = document.getElementById('teamA');
  var teamB        = document.getElementById('teamB');
  var predictBtn   = document.getElementById('predictBtn');
  var loader       = document.getElementById('loader');
  var errorDiv     = document.getElementById('error');
  var errorMsg     = document.getElementById('errorMsg');
  var resultDiv    = document.getElementById('result');
  var combinedDiv  = document.getElementById('combinedScore');
  var espnPanel    = document.getElementById('espnPanel');
  var espnGrid     = document.getElementById('espnGrid');
  var quotaInfo    = document.getElementById('quotaInfo');
  var scanBtn      = document.getElementById('scanBtn');
  var scannerPanel = document.getElementById('scannerPanel');
  var evFilterRow  = document.getElementById('evFilterRow');
  var v1Panel      = document.getElementById('v1Panel');
  var mlbPanel     = document.getElementById('mlbGamesPanel');

  function showError(msg){ errorMsg.textContent=msg; errorDiv.style.display='block'; }
  function hideError(){ errorDiv.style.display='none'; }
  function setLoading(on){ loader.style.display=on?'block':'none'; }
  function oddsToProb(d){ return 1/d; }

  function formatGameTime(u){
    if(!u) return '—';
    return new Date(u).toLocaleTimeString('es-PA',{hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'})+' (PTY)';
  }
  function isToday(u){
    if(!u) return false;
    var o={timeZone:'America/Panama'};
    return new Date(u).toLocaleDateString('es-PA',o)===new Date().toLocaleDateString('es-PA',o);
  }
  function getWindDir(deg){ return ['Norte','Noreste','Este','Sureste','Sur','Suroeste','Oeste','Noroeste'][Math.round(deg/45)%8]; }

  function getAvgProb(events,name){
    var total=0,count=0;
    events.forEach(function(ev){
      if(ev.home_team!==name&&ev.away_team!==name) return;
      ev.bookmakers.forEach(function(bk){
        var h2h=bk.markets.find(function(m){return m.key==='h2h';});
        if(!h2h) return;
        var out=h2h.outcomes.find(function(o){return o.name===name;});
        if(out){total+=oddsToProb(out.price);count++;}
      });
    });
    return count>0?total/count:null;
  }

  function getBestOdd(ev,teamName){
    var best=1, nL=teamName.toLowerCase(), nLast=nL.split(' ').pop();
    ev.bookmakers.forEach(function(bk){
      var h2h=bk.markets.find(function(m){return m.key==='h2h';});
      if(!h2h) return;
      h2h.outcomes.forEach(function(o){
        if(!o.price||o.price<=1||o.price>15) return;
        var oL=o.name.toLowerCase();
        if((oL===nL||oL.includes(nLast)||nL.includes(oL.split(' ').pop()))&&o.price>best) best=o.price;
      });
    });
    return best;
  }

  function calcFormScore(form){
    if(!form||form.length===0) return null;
    var weights=[1.0,0.9,0.8,0.7,0.6],total=0,maxTotal=0;
    form.slice().reverse().forEach(function(f,i){
      var w=weights[i]||0.5; maxTotal+=w;
      if(f.result==='W') total+=w;
      else if(f.result==='D') total+=w*0.5;
    });
    return maxTotal>0?total/maxTotal:null;
  }

  async function fetchWindData(lat,lon){
    var key=lat+','+lon;
    if(windCache[key]) return windCache[key];
    try{
      var res=await fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=wind_speed_10m,wind_direction_10m,temperature_2m&wind_speed_unit=kmh&timezone=America%2FPanama');
      var d=await res.json(); var c=d.current||{};
      var r={speed:Math.round(c.wind_speed_10m||0),direction:Math.round(c.wind_direction_10m||0),temp:Math.round(c.temperature_2m||0)};
      windCache[key]=r; return r;
    }catch(e){return null;}
  }

  async function fetchMLBPlayerStats(espnLeague){
    if(mlbStatsCache) return mlbStatsCache;
    var lg=espnLeague||'mlb';
    var base=ESPN3+'/baseball/'+lg+'/statistics/byathlete';
    try{
      var res=await Promise.all([
        fetch(base+'?category=batting&sort=batting.hits&limit=100&lang=en&region=us'),
        fetch(base+'?category=pitching&sort=pitching.strikeouts&limit=100&lang=en&region=us')
      ]);
      var batJ=res[0].ok?await res[0].json():null;
      var pitJ=res[1].ok?await res[1].json():null;
      function parse(json,statKey,gKey){
        if(!json||!json.athletes) return [];
        return json.athletes.map(function(a){
          var vals={};
          (a.categories||[]).forEach(function(cat){
            (cat.names||[]).forEach(function(n,i){ vals[n]=parseFloat((cat.values||[])[i])||0; });
          });
          var ath=a.athlete||{};
          var main=vals[statKey]||0, games=Math.max(vals[gKey]||1,1);
          return { name:ath.displayName||'—', team:(ath.team&&ath.team.abbreviation)||'—', main:main, games:games, era:vals['ERA']||0, whip:vals['WHIP']||0, avg:vals['avg']||0, ppg:main/games };
        }).filter(function(a){return a.ppg>0;}).sort(function(a,b){return b.ppg-a.ppg;});
      }
      mlbStatsCache={hitters:parse(batJ,'hits','gamesPlayed'),pitchers:parse(pitJ,'strikeouts','gamesStarted')};
      return mlbStatsCache;
    }catch(e){return{hitters:[],pitchers:[]};}
  }

  function getTopHitters(stats,abbr){
    if(!stats||!stats.hitters||!abbr) return [];
    return stats.hitters.filter(function(h){return h.team.toLowerCase()===abbr.toLowerCase();}).slice(0,3);
  }

  function enrichPitcher(stats,name){
    if(!name||name==='TBD'||!stats||!stats.pitchers) return null;
    var last=name.toLowerCase().split(' ').pop();
    return stats.pitchers.find(function(p){return p.name.toLowerCase().includes(last);})||null;
  }

  function populateTeams(events,staticTeams){
    var teams=new Set(staticTeams||[]);
    events.forEach(function(e){teams.add(e.home_team);teams.add(e.away_team);});
    var sorted=Array.from(teams).sort();
    [teamA,teamB].forEach(function(sel){
      sel.innerHTML='<option value="">— Elige un equipo —</option>';
      sorted.forEach(function(t){var o=document.createElement('option');o.value=t;o.textContent=t;sel.appendChild(o);});
      sel.disabled=false;
    });
  }

  async function loadESPNTeams(leagueKey){
    var m=ESPN_LEAGUE_MAP[leagueKey]; if(!m) return;
    try{
      var res=await fetch(ESPN+'/'+m.sport+'/'+m.league+'/teams?limit=100');
      if(!res.ok) return;
      var data=await res.json();
      var list=(data.sports&&data.sports[0]&&data.sports[0].leagues&&data.sports[0].leagues[0]&&data.sports[0].leagues[0].teams)||data.teams||[];
      list.forEach(function(t){var team=t.team||t;if(team.displayName&&team.id)espnTeamsMap[team.displayName]={id:team.id,logo:(team.logos&&team.logos[0]&&team.logos[0].href)||''};});
    }catch(e){}
  }

  async function fetchESPNTeamData(leagueKey,teamName){
    if(espnDataCache[teamName]) return espnDataCache[teamName];
    var m=ESPN_LEAGUE_MAP[leagueKey]; if(!m) return null;
    var info=espnTeamsMap[teamName];
    if(!info){
      var last=teamName.toLowerCase().split(' ').pop();
      var key=Object.keys(espnTeamsMap).find(function(k){return k.toLowerCase().includes(last)||teamName.toLowerCase().includes(k.toLowerCase().split(' ').pop());});
      info=key?espnTeamsMap[key]:null;
    }
    if(!info) return null;
    try{
      var rs=await Promise.all([fetch(ESPN+'/'+m.sport+'/'+m.league+'/teams/'+info.id),fetch(ESPN+'/'+m.sport+'/'+m.league+'/teams/'+info.id+'/schedule')]);
      var tD=rs[0].ok?await rs[0].json():null, sD=rs[1].ok?await rs[1].json():null;
      var form=[];
      if(sD){
        var played=(sD.events||[]).filter(function(e){return e.competitions&&e.competitions[0]&&e.competitions[0].status&&e.competitions[0].status.type&&e.competitions[0].status.type.completed;});
        form=played.slice(-5).map(function(e){
          var comp=e.competitions[0];
          var mine=comp.competitors.find(function(c){return c.team&&c.team.id===info.id;});
          var opp=comp.competitors.find(function(c){return c.team&&c.team.id!==info.id;});
          var ms=Number(mine&&mine.score)||0, os=Number(opp&&opp.score)||0;
          return {result:ms>os?'W':ms<os?'L':'D',score:ms+'-'+os,opponent:(opp&&opp.team&&opp.team.shortDisplayName)||'?',date:e.date?e.date.substring(0,10):''};
        });
      }
      var record=tD&&tD.team&&tD.team.record&&tD.team.record.items&&tD.team.record.items[0];
      var stats={};
      if(record&&record.stats) record.stats.forEach(function(s){stats[s.name]=s.value;});
      var result={name:(tD&&tD.team&&tD.team.displayName)||teamName,logo:info.logo,wins:stats.wins||0,losses:stats.losses||0,pointsFor:stats.pointsFor||stats.avgPoints||'—',form:form,formScore:calcFormScore(form)};
      espnDataCache[teamName]=result; return result;
    }catch(e){return null;}
  }

  function renderTeamCard(data,teamName){
    if(!data) return '<div class="team-card"><h3>'+teamName+'</h3><div style="color:#555;font-size:0.8rem">Sin datos ESPN</div></div>';
    var ns=data.wins===0&&data.losses===0&&data.form.length===0;
    var fH=data.form.length?data.form.map(function(f){return '<div class="form-badge '+f.result+'" title="'+f.opponent+' '+f.score+'">'+f.result+'</div>';}).join(''):'<span style="color:#555;font-size:0.78rem">'+(ns?'🆕 Inicio de temporada':'Sin historial')+'</span>';
    var logo=data.logo?'<img class="team-logo" src="'+data.logo+'" onerror="this.style.display=\'none\'">':'';
    var fsV=data.formScore!==null?Math.round(data.formScore*100):null;
    var fsB=fsV!==null?'<div class="form-score-bar"><div class="form-score-label"><span>Forma ESPN</span><span>'+fsV+'%</span></div><div class="form-score-track"><div class="form-score-fill" style="width:'+fsV+'%;background:'+(fsV>=60?'#2cb67d':fsV>=40?'#ffd700':'#ff6b6b')+'"></div></div></div>':'';
    return '<div class="team-card"><h3>'+logo+' '+data.name+'</h3><div class="section-title">Forma reciente</div><div class="form-row">'+fH+'</div>'+fsB+'<div class="section-title">Temporada</div><div class="stat-row"><span>Victorias</span><span>'+(ns?'🆕 —':data.wins)+'</span></div><div class="stat-row"><span>Derrotas</span><span>'+(ns?'🆕 —':data.losses)+'</span></div>'+(data.pointsFor!=='—'?'<div class="stat-row"><span>Pts promedio</span><span>'+(typeof data.pointsFor==='number'?data.pointsFor.toFixed(1):data.pointsFor)+'</span></div>':'')+'</div>';
  }

  function renderCombinedScore(tA,tB,probA,probB,dataA,dataB){
    var fsA=dataA&&dataA.formScore!==null?dataA.formScore:0.5;
    var fsB=dataB&&dataB.formScore!==null?dataB.formScore:0.5;
    var hasE=(dataA&&dataA.formScore!==null)||(dataB&&dataB.formScore!==null);
    var cA=(probA*0.6)+(fsA*0.4), cB=(probB*0.6)+(fsB*0.4), tot=cA+cB;
    var pA=cA/tot, pB=cB/tot, diff=Math.abs(pA-pB);
    var cC,cT;
    if(diff>0.15){cC='conf-high';cT='🟢 Alta confianza';}
    else if(diff>0.07){cC='conf-medium';cT='🟡 Confianza media';}
    else{cC='conf-low';cT='🔴 Partido muy parejo';}
    document.getElementById('combinedWinner').textContent='🏆 '+(pA>=pB?tA:tB);
    document.getElementById('combinedSub').textContent=hasE?'Odds (60%) + Forma ESPN (40%)':'Solo odds — sin datos ESPN';
    document.getElementById('cbNameA').textContent=tA; document.getElementById('cbScoreA').textContent=Math.round(pA*100)+'%';
    document.getElementById('cbDetailA').textContent='Odds: '+Math.round(probA*100)+'% · Forma: '+(dataA&&dataA.formScore!==null?Math.round(fsA*100)+'%':'N/A');
    document.getElementById('cbNameB').textContent=tB; document.getElementById('cbScoreB').textContent=Math.round(pB*100)+'%';
    document.getElementById('cbDetailB').textContent='Odds: '+Math.round(probB*100)+'% · Forma: '+(dataB&&dataB.formScore!==null?Math.round(fsB*100)+'%':'N/A');
    document.getElementById('cbBoxA').className='combined-bar-item'+(pA>=pB?' best':'');
    document.getElementById('cbBoxB').className='combined-bar-item'+(pB>pA?' best':'');
    document.getElementById('confidenceBadge').innerHTML='<span class="confidence-badge '+cC+'">'+cT+'</span>';
    combinedDiv.style.display='block';
  }  // ── SPORT SELECTOR ────────────────────────────────────────────
  sportSelect.addEventListener('change', function(){
    var sport=this.value;
    hideError();
    resultDiv.style.display='none'; combinedDiv.style.display='none';
    espnPanel.style.display='none'; scannerPanel.style.display='none';
    scannerPanel.innerHTML=''; evFilterRow.style.display='none';
    mlbPanel.style.display='none'; mlbPanel.innerHTML='';
    eventsCache=[]; espnTeamsMap={}; espnDataCache={};
    scanResults=[]; pitchersCache=null; windCache={}; mlbStatsCache=null;
    leagueSelect.innerHTML='<option value="">— Elige una liga —</option>';
    leagueSelect.disabled=!sport;
    teamA.innerHTML='<option value="">— Primero elige liga —</option>'; teamA.disabled=true;
    teamB.innerHTML='<option value="">— Primero elige liga —</option>'; teamB.disabled=true;
    predictBtn.disabled=true; scanBtn.disabled=true;
    v1Panel.style.display='flex';
    if(!sport) return;
    (LEAGUES[sport]||[]).forEach(function(l){
      var opt=document.createElement('option'); opt.value=l.key; opt.textContent=l.title;
      leagueSelect.appendChild(opt);
    });
  });

  // ── LEAGUE SELECTOR ───────────────────────────────────────────
  leagueSelect.addEventListener('change', async function(){
    var leagueKey=this.value;
    hideError();
    resultDiv.style.display='none'; combinedDiv.style.display='none';
    espnPanel.style.display='none'; scannerPanel.style.display='none';
    scannerPanel.innerHTML=''; evFilterRow.style.display='none';
    mlbPanel.style.display='none'; mlbPanel.innerHTML='';
    espnDataCache={}; scanResults=[]; pitchersCache=null; mlbStatsCache=null;
    scanBtn.disabled=true;
    if(!leagueKey){
      teamA.innerHTML='<option value="">— Elige liga primero —</option>'; teamA.disabled=true;
      teamB.innerHTML='<option value="">— Elige liga primero —</option>'; teamB.disabled=true;
      predictBtn.disabled=true; return;
    }
    var sport=sportSelect.value;
    var leagueConfig=(LEAGUES[sport]||[]).find(function(l){return l.key===leagueKey;});
    var isBaseballPanel=leagueConfig&&leagueConfig.panel;

    if(isBaseballPanel){
      // ── MODO PANEL BÉISBOL ──────────────────────────────────
      v1Panel.style.display='none';
      await loadMLBGamesPanel(leagueKey);
    } else {
      // ── MODO 1v1 (Fútbol / Basketball) ─────────────────────
      v1Panel.style.display='flex';
      var staticTeams=leagueConfig&&leagueConfig.staticTeams?leagueConfig.staticTeams:[];
      teamA.innerHTML='<option value="">— Cargando... —</option>'; teamA.disabled=true;
      teamB.innerHTML='<option value="">— Cargando... —</option>'; teamB.disabled=true;
      predictBtn.disabled=true; setLoading(true);
      try{
        var rs=await Promise.all([
          fetch(BASE+'/sports/'+leagueKey+'/odds/?apiKey='+API_KEY+'&regions=eu&markets=h2h&oddsFormat=decimal'),
          loadESPNTeams(leagueKey)
        ]);
        var oddsRes=rs[0];
        var rem=oddsRes.headers.get('x-requests-remaining'), used=oddsRes.headers.get('x-requests-used');
        if(rem!==null) quotaInfo.textContent='Créditos usados: '+used+' | Restantes: '+rem;
        var data=[];
        if(oddsRes.ok){data=await oddsRes.json();if(!Array.isArray(data))data=[];}
        if(staticTeams.length===0&&data.length===0){showError('No hay partidos disponibles.');setLoading(false);return;}
        eventsCache=data; populateTeams(data,staticTeams);
        if(eventsCache.length>0) scanBtn.disabled=false;
      }catch(e){showError('Error: '+e.message);}
      setLoading(false);
    }
  });

  function checkTeams(){
    hideError(); var a=teamA.value,b=teamB.value;
    predictBtn.disabled=!(a&&b&&a!==b);
    if(a&&b&&a===b) showError('Elige dos equipos distintos.');
  }
  teamA.addEventListener('change',checkTeams);
  teamB.addEventListener('change',checkTeams);

  predictBtn.addEventListener('click', async function(){
    hideError(); resultDiv.style.display='none'; combinedDiv.style.display='none'; espnPanel.style.display='none';
    var tA=teamA.value,tB=teamB.value;
    if(!tA||!tB||tA===tB){showError('Selecciona dos equipos distintos.');return;}
    var rel=eventsCache.filter(function(e){return(e.home_team===tA&&e.away_team===tB)||(e.home_team===tB&&e.away_team===tA);});
    var direct=rel.length>0;
    if(!direct) rel=eventsCache.filter(function(e){return e.home_team===tA||e.away_team===tA||e.home_team===tB||e.away_team===tB;});
    var probA=0.5,probB=0.5;
    if(rel.length>0){
      var pAr=getAvgProb(rel,tA),pBr=getAvgProb(rel,tB);
      if(pAr!==null&&pBr!==null){
        var tot=pAr+pBr; probA=pAr/tot; probB=pBr/tot;
        var bks=new Set(); rel.forEach(function(e){e.bookmakers.forEach(function(b){bks.add(b.key);});});
        document.getElementById('winnerName').textContent='🏆 '+(probA>=probB?tA:tB);
        document.getElementById('bookmakerCount').textContent='Basado en '+bks.size+' casas · '+(direct?'Partido directo':'Rendimiento individual');
        document.getElementById('nameA').textContent=tA; document.getElementById('pctA').textContent=Math.round(probA*100)+'%';
        document.getElementById('nameB').textContent=tB; document.getElementById('pctB').textContent=Math.round(probB*100)+'%';
        document.getElementById('boxA').className='prob-box'+(probA>=probB?' highlight':'');
        document.getElementById('boxB').className='prob-box'+(probB>probA?' highlight':'');
        document.getElementById('barFill').style.width=Math.round(probA*100)+'%';
        resultDiv.style.display='block';
      }
    }else{showError('No hay odds para estos equipos.');}
    var leagueKey=leagueSelect.value;
    espnPanel.style.display='flex';
    espnGrid.innerHTML='<div style="color:#555;font-size:0.85rem">⏳ Cargando ESPN...</div>';
    var espnR=await Promise.all([fetchESPNTeamData(leagueKey,tA),fetchESPNTeamData(leagueKey,tB)]);
    espnGrid.innerHTML=renderTeamCard(espnR[0],tA)+renderTeamCard(espnR[1],tB);
    if(resultDiv.style.display==='block') renderCombinedScore(tA,tB,probA,probB,espnR[0],espnR[1]);
  });

  // ── MLB PANEL ─────────────────────────────────────────────────
  async function loadMLBGamesPanel(leagueKey){
    mlbPanel.style.display='flex'; mlbPanel.style.flexDirection='column'; mlbPanel.style.gap='14px';
    mlbPanel.innerHTML='<div style="text-align:center;color:#555;padding:24px;font-size:0.85rem">⏳ Cargando partidos, pitchers y estadísticas...</div>';
    var espnMap=ESPN_LEAGUE_MAP[leagueKey]||{sport:'baseball',league:'mlb'};
    try{
      var fetchOdds=leagueKey!=='baseball_ncaa'
        ?fetch(BASE+'/sports/'+leagueKey+'/odds/?apiKey='+API_KEY+'&regions=eu&markets=h2h&oddsFormat=decimal')
        :Promise.resolve(null);
      var rs=await Promise.all([
        fetch(ESPN+'/'+espnMap.sport+'/'+espnMap.league+'/scoreboard'),
        fetchMLBPlayerStats(espnMap.league),
        fetchOdds
      ]);
      var scoreData=rs[0].ok?await rs[0].json():null;
      var playerStats=rs[1];
      var oddsData=[];
      if(rs[2]&&rs[2].ok){
        oddsData=await rs[2].json(); if(!Array.isArray(oddsData)) oddsData=[];
        var rem=rs[2].headers.get('x-requests-remaining'), used=rs[2].headers.get('x-requests-used');
        if(rem!==null) quotaInfo.textContent='Créditos usados: '+used+' | Restantes: '+rem;
      }
      var events=(scoreData&&scoreData.events)||[];
      mlbPanel.innerHTML='';
      if(events.length===0){
        mlbPanel.innerHTML='<div style="text-align:center;color:#555;padding:24px">📅 No hay partidos hoy en esta liga.</div>';
        return;
      }
      var hdr=document.createElement('div');
      hdr.style.cssText='font-size:0.75rem;color:#f7971e;text-transform:uppercase;letter-spacing:0.08em;padding:4px 0';
      hdr.textContent='⚾ '+events.length+' partido(s) programados hoy';
      mlbPanel.appendChild(hdr);
      for(var i=0;i<events.length;i++){
        var card=await buildGameCard(events[i],oddsData,playerStats);
        mlbPanel.appendChild(card);
      }
    }catch(e){
      mlbPanel.innerHTML='<div style="color:#ff6b6b;padding:16px">❌ Error: '+e.message+'</div>';
    }
  }

  async function buildGameCard(ev,oddsData,playerStats){
    var comp=ev.competitions&&ev.competitions[0];
    var homeC=(comp&&comp.competitors||[]).find(function(c){return c.homeAway==='home';})||{};
    var awayC=(comp&&comp.competitors||[]).find(function(c){return c.homeAway==='away';})||{};
    var homeTeam=(homeC.team&&homeC.team.displayName)||'—';
    var awayTeam=(awayC.team&&awayC.team.displayName)||'—';
    var homeAbbr=(homeC.team&&homeC.team.abbreviation)||'';
    var awayAbbr=(awayC.team&&awayC.team.abbreviation)||'';
    var homeLogo=(homeC.team&&homeC.team.logo)||'';
    var awayLogo=(awayC.team&&awayC.team.logo)||'';
    var gameTime=formatGameTime(ev.date);

    // Pitchers
    var pitchers={home:null,away:null};
    if(comp&&comp.probables){
      comp.probables.forEach(function(p){
        var a=p.athlete||{}, st=p.statistics||[];
        var era=st.find(function(s){return s.name==='ERA';});
        var whip=st.find(function(s){return s.name==='WHIP';});
        pitchers[p.homeAway]={name:a.displayName||'TBD',era:era?parseFloat(era.displayValue).toFixed(2):'—',whip:whip?parseFloat(whip.displayValue).toFixed(2):'—'};
      });
    }
    if(!pitchers.home&&!pitchers.away&&comp){
      (comp.competitors||[]).forEach(function(c){
        if(c.probable){var a=c.probable.athlete||{};pitchers[c.homeAway]={name:a.displayName||'TBD',era:'—',whip:'—'};}
      });
    }

    // Enriquecer con K/G
    var hPS=pitchers.home?enrichPitcher(playerStats,pitchers.home.name):null;
    var aPS=pitchers.away?enrichPitcher(playerStats,pitchers.away.name):null;

    // Top bateadores
    var homeHitters=getTopHitters(playerStats,homeAbbr);
    var awayHitters=getTopHitters(playerStats,awayAbbr);

    // Estadio + viento
    var stadium=TEAM_STADIUM[homeTeam]||null;
    var wind=stadium?await fetchWindData(stadium.coords[0],stadium.coords[1]):null;

    // Odds
    var mktHome=0.5,mktAway=0.5,bestOddH=1,bestOddA=1,bkCount=0,oddsEv=null;
    oddsEv=oddsData.find(function(o){
      var hL=homeTeam.toLowerCase(),aL=awayTeam.toLowerCase();
      var ohL=o.home_team.toLowerCase(),oaL=o.away_team.toLowerCase();
      return(ohL===hL&&oaL===aL)||(hL.includes(ohL.split(' ').pop())&&aL.includes(oaL.split(' ').pop()));
    });
    if(oddsEv){
      var pA=getAvgProb([oddsEv],oddsEv.home_team), pB=getAvgProb([oddsEv],oddsEv.away_team);
      if(pA&&pB){
        var tot=pA+pB; var rH=pA/tot, rA=pB/tot;
        var isFlipped=oddsEv.home_team.toLowerCase().includes(awayTeam.toLowerCase().split(' ').pop());
        mktHome=isFlipped?rA:rH; mktAway=isFlipped?rH:rA;
        if(mktHome<0.05||mktAway<0.05){mktHome=0.5;mktAway=0.5;oddsEv=null;}
      }
      if(oddsEv){
        bestOddH=getBestOdd(oddsEv,homeTeam); bestOddA=getBestOdd(oddsEv,awayTeam);
        var bks=new Set(); oddsEv.bookmakers.forEach(function(b){bks.add(b.key);}); bkCount=bks.size;
      }
    }

    // Modelo
    var pfAdj=stadium?(stadium.pf-1)*0.05:0;
    var mH=mktHome+pfAdj, mA=mktAway, totM=mH+mA;
    mH/=totM; mA/=totM;
    var edgeH=mH-mktHome, edgeA=mA-mktAway;
    var betH=Math.abs(edgeH)>=Math.abs(edgeA);
    var betTeam=betH?homeTeam:awayTeam;
    var betEdge=betH?edgeH:edgeA;
    var betModel=betH?mH:mA;
    var betOdd=betH?bestOddH:bestOddA;
    var evVal=oddsEv?(betModel*(betOdd-1))-(1-betModel):null;

    // Semáforo
    var pitchOK=(pitchers.home&&pitchers.home.name!=='TBD')||(pitchers.away&&pitchers.away.name!=='TBD');
    var windBad=wind&&wind.speed>20;
    var recC,recL;
    if(oddsEv&&betEdge>0.07&&!windBad&&bkCount>=3){
      recC='rec-good'; recL='🟢 BUENO — Apostar: '+betTeam+' · Edge +'+Math.round(betEdge*100)+'%'+(evVal?' · EV: +'+(evVal*100).toFixed(1)+'¢':'');
    }else if(oddsEv&&betEdge>0.03){
      recC='rec-tight'; recL='🟡 APRETADO — '+(pitchOK?'Pitchers confirmados':'Pitchers TBD')+' · Edge +'+Math.round(betEdge*100)+'%';
    }else{
      recC='rec-avoid'; recL='🔴 EVITAR — '+(!oddsEv?'Sin odds disponibles':'Edge insuficiente o partido parejo');
    }

    // Render pitcher col
    function pitcherCol(p,ps,label){
      var name=(p&&p.name!=='TBD')?p.name:'🔄 TBD';
      var era=(p&&p.era)||'—';
      var kpg=ps?ps.ppg.toFixed(1):'—';
      var kC=ps&&ps.ppg>=8?'#2cb67d':ps&&ps.ppg>=6?'#ffd700':'#aaa';
      var kStar=ps&&ps.ppg>=8?' ⭐':ps&&ps.ppg>=6?' ✔':'';
      return '<div class="mlb-team-col">'+
        '<div class="mlb-team-col-name">'+label+'</div>'+
        '<div class="mlb-row-section">Pitcher abridor</div>'+
        '<div class="mlb-row"><span>Nombre</span><span>'+name+'</span></div>'+
        '<div class="mlb-row"><span>ERA</span><span>'+era+'</span></div>'+
        '<div class="mlb-row"><span>K/salida</span><span style="color:'+kC+'">'+kpg+kStar+'</span></div>'+
        (p&&p.whip&&p.whip!=='—'?'<div class="mlb-row"><span>WHIP</span><span>'+p.whip+'</span></div>':'')+
        '<div class="mlb-row-section">Top bateadores (H/G)</div>'+
        (function(hitters){
          if(!hitters||!hitters.length) return '<div style="color:#555;font-size:0.75rem;padding:2px 0">Sin datos aún</div>';
          return hitters.map(function(h){
            var hC=h.ppg>=1.2?'#2cb67d':h.ppg>=0.9?'#ffd700':'#aaa';
            return '<div class="mlb-row"><span>'+h.name+'</span><span style="color:'+hC+'">'+h.ppg.toFixed(2)+' H/G</span></div>';
          }).join('');
        })(label==='🏠 Local'?homeHitters:awayHitters)+
      '</div>';
    }

    // Odds row
    var oddsHTML=oddsEv?
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-top:8px">'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">'+homeAbbr+' Prob</div><div class="mlb-odd-value" style="color:#e0e0f0">'+Math.round(mktHome*100)+'%</div></div>'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">'+awayAbbr+' Prob</div><div class="mlb-odd-value" style="color:#e0e0f0">'+Math.round(mktAway*100)+'%</div></div>'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">Mejor odd '+homeAbbr+'</div><div class="mlb-odd-value" style="color:#ffd700">'+bestOddH.toFixed(2)+'</div></div>'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">Mejor odd '+awayAbbr+'</div><div class="mlb-odd-value" style="color:#ffd700">'+bestOddA.toFixed(2)+'</div></div>'+
      '</div>'
      :'<div style="color:#555;font-size:0.78rem;margin-top:6px">Sin odds disponibles para este partido</div>';

    // Estadio + viento
    var extrasHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
    if(stadium){
      var pfC=stadium.pf>=1.10?'#ff6b6b':stadium.pf<=0.90?'#2cb67d':'#ffd700';
      var pfT=stadium.pf>=1.10?' 🔥 Favorece runs':stadium.pf<=0.90?' 🛡️ Suprime runs':' ⚖️ Neutro';
      extrasHTML+='<div class="mlb-extra-mini"><div class="mlb-extra-mini-label">🏟️ Estadio</div><div class="mlb-extra-mini-value">'+stadium.name+'</div><div style="font-size:0.68rem;color:'+pfC+'">PF: ×'+stadium.pf.toFixed(2)+pfT+'</div></div>';
    }
    if(wind){
      var wE=wind.speed>20?'💨':wind.speed>10?'🌬️':'🍃';
      var wI=wind.speed>15?' · Afecta jonrones':'';
      extrasHTML+='<div class="mlb-extra-mini"><div class="mlb-extra-mini-label">'+wE+' Viento</div><div class="mlb-extra-mini-value">'+wind.speed+' km/h → '+getWindDir(wind.direction)+wI+'</div><div style="font-size:0.68rem;color:#666">🌡️ '+wind.temp+'°C</div></div>';
    }
    extrasHTML+='</div>';

    var div=document.createElement('div');
    div.style.cssText='background:#0f0f1a;border:1px solid #2a2a4a;border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px';
    div.innerHTML=
      '<div style="font-size:0.72rem;color:#7f5af0">⏰ '+gameTime+'</div>'+
      '<div style="font-size:1rem;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
        (homeLogo?'<img src="'+homeLogo+'" style="width:22px;height:22px;object-fit:contain" onerror="this.style.display=\'none\'">':'')+
        homeTeam+' <span style="color:#555">vs</span> '+
        (awayLogo?'<img src="'+awayLogo+'" style="width:22px;height:22px;object-fit:contain" onerror="this.style.display=\'none\'">':'')+
        awayTeam+
      '</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
        pitcherCol(pitchers.home,hPS,'🏠 Local')+
        pitcherCol(pitchers.away,aPS,'✈️ Visita')+
      '</div>'+
      extrasHTML+
      oddsHTML+
      '<div class="mlb-rec-badge '+recC+'">'+recL+'</div>';
    return div;
  }

  // ── SCANNER (Fútbol / Basketball) ─────────────────────────────
  function renderScannerResults(){
    var filtered=scanResults.filter(function(r){return r.ev>=evMinActive;});
    scannerPanel.querySelectorAll('.scanner-card').forEach(function(c){c.remove();});
    var hdr=scannerPanel.querySelector('.scanner-header');
    if(!hdr){hdr=document.createElement('div');hdr.className='scanner-header';hdr.style.cssText='font-size:0.75rem;color:#f7971e;text-transform:uppercase;letter-spacing:0.08em;padding:4px 0';scannerPanel.appendChild(hdr);}
    if(filtered.length===0){hdr.textContent='❌ No hay partidos con EV ≥ '+Math.round(evMinActive*100)+'% en este filtro.';return;}
    hdr.textContent='✅ '+filtered.length+' partido(s) con valor encontrados hoy';
    filtered.forEach(function(r){
      var eC=r.ev>=0.10?'#2cb67d':r.ev>=0.05?'#ffd700':'#ff6b6b';
      var eL=r.ev>=0.10?'🟢 EV alto':r.ev>=0.05?'🟡 EV moderado':'🔴 EV bajo';
      var sI=r.sport==='baseball'?'⚾':r.sport==='basketball'?'🏀':'⚽';
      var card=document.createElement('div'); card.className='scanner-card'; card.style.cssText='border:1px solid '+eC+'44;';
      card.innerHTML=
        '<div style="font-size:0.72rem;color:#555;margin-bottom:4px">'+sI+' ⏰ '+r.time+' · '+r.home+' vs '+r.away+'</div>'+
        '<div style="font-size:1.05rem;font-weight:700;color:'+eC+';margin-bottom:10px">✅ APOSTAR: '+r.betTeam+'</div>'+
        '<div class="scanner-stats">'+
          '<div class="scanner-stat"><div class="scanner-stat-label">Modelo</div><div class="scanner-stat-value" style="color:#e0e0f0">'+r.modelPct+'%</div></div>'+
          '<div class="scanner-stat"><div class="scanner-stat-label">Casa dice</div><div class="scanner-stat-value" style="color:#aaa">'+r.mktPct+'%</div></div>'+
          '<div class="scanner-stat"><div class="scanner-stat-label">Mejor odd</div><div class="scanner-stat-value" style="color:#ffd700">'+r.odd+'</div></div>'+
          '<div class="scanner-stat"><div class="scanner-stat-label">Edge</div><div class="scanner-stat-value" style="color:'+eC+'">+'+Math.round(r.edge*100)+'%</div></div>'+
        '</div>'+
        '<div style="margin-top:8px;font-size:0.78rem;color:'+eC+'">'+eL+' · EV: '+(r.ev>0?'+':'')+(r.ev*100).toFixed(1)+'¢ por $1 apostado</div>';
      scannerPanel.appendChild(card);
    });
  }

  scanBtn.addEventListener('click', async function(){
    if(eventsCache.length===0) return;
    scanBtn.disabled=true; scanBtn.textContent='⏳ Escaneando...';
    scannerPanel.style.display='flex'; scannerPanel.innerHTML='<div style="color:#555;font-size:0.85rem;text-align:center;padding:8px">Analizando...</div>';
    scanResults=[];
    var leagueKey=leagueSelect.value, sport=sportSelect.value;
    for(var i=0;i<eventsCache.length;i++){
      var ev=eventsCache[i]; if(!isToday(ev.commence_time)) continue;
      var tA=ev.home_team, tB=ev.away_team;
      var pAr=getAvgProb([ev],tA), pBr=getAvgProb([ev],tB);
      if(!pAr||!pBr) continue;
      var tot=pAr+pBr, mktA=pAr/tot, mktB=pBr/tot;
      if(mktA<0.05||mktB<0.05) continue;
      var dataA=await fetchESPNTeamData(leagueKey,tA), dataB=await fetchESPNTeamData(leagueKey,tB);
      var fsA=dataA&&dataA.formScore!==null?dataA.formScore:0.5;
      var fsB=dataB&&dataB.formScore!==null?dataB.formScore:0.5;
      var combA=(mktA*0.6)+(fsA*0.4), combB=(mktB*0.6)+(fsB*0.4), totC=combA+combB;
      var modelA=combA/totC, modelB=combB/totC;
      var edgeA=modelA-mktA, edgeB=modelB-mktB;
      if(Math.max(Math.abs(edgeA),Math.abs(edgeB))<0.05) continue;
      var betH=edgeA>=edgeB;
      var betTeam=betH?tA:tB, betEdge=betH?edgeA:edgeB, betModel=betH?modelA:modelB, betMkt=betH?mktA:mktB;
      var bestOdd=getBestOdd(ev,betTeam);
      var evVal=(betModel*(bestOdd-1))-(1-betModel);
      scanResults.push({home:tA,away:tB,betTeam:betTeam,edge:betEdge,ev:evVal,modelPct:Math.round(betModel*100),mktPct:Math.round(betMkt*100),odd:bestOdd.toFixed(2),time:formatGameTime(ev.commence_time),sport:sport});
    }
    scanResults.sort(function(a,b){return b.ev-a.ev;});
    scannerPanel.innerHTML=''; evFilterRow.style.display='flex';
    renderScannerResults();
    scanBtn.disabled=false; scanBtn.textContent='🔍 Escanear todos los partidos de hoy';
  });

  document.querySelectorAll('.ev-filter').forEach(function(btn){
    btn.addEventListener('click',function(){
      evMinActive=parseFloat(this.dataset.min);
      document.querySelectorAll('.ev-filter').forEach(function(b){b.classList.remove('active');});
      this.classList.add('active'); renderScannerResults();
    });
  });

});
