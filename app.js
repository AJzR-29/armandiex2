document.addEventListener('DOMContentLoaded', function () {

  var API_KEY = '27efeb9368c8c4d45c578bb7d0136365';
  var BASE    = 'https://api.the-odds-api.com/v4';
  var ESPN    = 'https://site.api.espn.com/apis/site/v2/sports';
  var ESPN3   = 'https://site.api.espn.com/apis/common/v3/sports';
  var MLBAPI  = 'https://statsapi.mlb.com/api/v1';
  var LEAGUE_AVG_ERA = 4.20;

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
    "Oakland Athletics":     { name:"Sacramento River Cats",    coords:[38.5802,-121.5085], pf:0.92 },
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

  var MLB_TEAM_IDS = {
    "Arizona Diamondbacks":109,"Atlanta Braves":144,"Baltimore Orioles":110,
    "Boston Red Sox":111,"Chicago Cubs":112,"Chicago White Sox":145,
    "Cincinnati Reds":113,"Cleveland Guardians":114,"Colorado Rockies":115,
    "Detroit Tigers":116,"Houston Astros":117,"Kansas City Royals":118,
    "Los Angeles Angels":108,"Los Angeles Dodgers":119,"Miami Marlins":146,
    "Milwaukee Brewers":158,"Minnesota Twins":142,"New York Mets":121,
    "New York Yankees":147,"Oakland Athletics":133,"Philadelphia Phillies":143,
    "Pittsburgh Pirates":134,"San Diego Padres":135,"San Francisco Giants":137,
    "Seattle Mariners":136,"St. Louis Cardinals":138,"Tampa Bay Rays":139,
    "Texas Rangers":140,"Toronto Blue Jays":141,"Washington Nationals":120
  };

  var NBA_TEAMS = ['Atlanta Hawks','Boston Celtics','Brooklyn Nets','Charlotte Hornets','Chicago Bulls','Cleveland Cavaliers','Dallas Mavericks','Denver Nuggets','Detroit Pistons','Golden State Warriors','Houston Rockets','Indiana Pacers','Los Angeles Clippers','Los Angeles Lakers','Memphis Grizzlies','Miami Heat','Milwaukee Bucks','Minnesota Timberwolves','New Orleans Pelicans','New York Knicks','Oklahoma City Thunder','Orlando Magic','Philadelphia 76ers','Phoenix Suns','Portland Trail Blazers','Sacramento Kings','San Antonio Spurs','Toronto Raptors','Utah Jazz','Washington Wizards'];
  var MLB_TEAMS = ['Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox','Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Guardians','Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals','Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers','Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics','Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants','Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers','Toronto Blue Jays','Washington Nationals'];

  var LEAGUES = {
    soccer: [
      { key:'soccer_uefa_champs_league',            title:'🏆 UEFA Champions League' },
      { key:'soccer_uefa_europa_league',            title:'🏆 UEFA Europa League' },
      { key:'soccer_uefa_europa_conference_league', title:'🏆 UEFA Conference League' },
      { key:'soccer_epl',                           title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
      { key:'soccer_efl_champ',                     title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 Championship' },
      { key:'soccer_fa_cup',                        title:'🏴󠁧󠁢󠁥󠁮󠁧󠁿 FA Cup' },
      { key:'soccer_spain_la_liga',                 title:'🇪🇸 La Liga' },
      { key:'soccer_spain_segunda_division',        title:'🇪🇸 La Liga 2' },
      { key:'soccer_germany_bundesliga',            title:'🇩🇪 Bundesliga' },
      { key:'soccer_germany_bundesliga2',           title:'🇩🇪 Bundesliga 2' },
      { key:'soccer_italy_serie_a',                 title:'🇮🇹 Serie A' },
      { key:'soccer_france_ligue_one',              title:'🇫🇷 Ligue 1' },
      { key:'soccer_portugal_primeira_liga',        title:'🇵🇹 Primeira Liga' },
      { key:'soccer_netherlands_eredivisie',        title:'🇳🇱 Eredivisie' },
      { key:'soccer_belgium_first_div',             title:'🇧🇪 First Division A' },
      { key:'soccer_turkey_super_league',           title:'🇹🇷 Süper Lig' },
      { key:'soccer_conmebol_copa_libertadores',    title:'🌎 Copa Libertadores' },
      { key:'soccer_conmebol_copa_sudamericana',    title:'🌎 Copa Sudamericana' },
      { key:'soccer_argentina_primera_division',    title:'🇦🇷 Primera División' },
      { key:'soccer_brazil_campeonato',             title:'🇧🇷 Brasileirão' },
      { key:'soccer_chile_campeonato',              title:'🇨🇱 Primera Chile' },
      { key:'soccer_mexico_ligamx',                 title:'🇲🇽 Liga MX' },
      { key:'soccer_usa_mls',                       title:'🇺🇸 MLS' },
      { key:'soccer_saudi_arabia_pro_league',       title:'🇸🇦 Saudi Pro League' },
      { key:'soccer_japan_j_league',                title:'🇯🇵 J League' },
      { key:'soccer_australia_aleague',             title:'🇦🇺 A-League' }
    ],
    basketball: [
      { key:'basketball_nba',           title:'🇺🇸 NBA',           staticTeams:NBA_TEAMS },
      { key:'basketball_nba_preseason', title:'🇺🇸 NBA Preseason', staticTeams:NBA_TEAMS },
      { key:'basketball_wnba',          title:'🇺🇸 WNBA' },
      { key:'basketball_ncaab',         title:'🇺🇸 NCAA Basketball' },
      { key:'basketball_euroleague',    title:'🇪🇺 EuroLeague' },
      { key:'basketball_nbl',           title:'🇦🇺 NBL Australia' }
    ],
    baseball: [
      { key:'baseball_mlb',           title:'⚾ MLB',          staticTeams:MLB_TEAMS, panel:true },
      { key:'baseball_mlb_preseason', title:'⚾ MLB Preseason',staticTeams:MLB_TEAMS, panel:true },
      { key:'baseball_ncaa',          title:'🎓 NCAA Béisbol',                         panel:true },
      { key:'baseball_npb',           title:'🇯🇵 NPB Japón' },
      { key:'baseball_kbo',           title:'🇰🇷 KBO Corea' }
    ]
  };

  var ESPN_LEAGUE_MAP = {
    soccer_epl:{ sport:'soccer',league:'eng.1' },
    soccer_spain_la_liga:{ sport:'soccer',league:'esp.1' },
    soccer_spain_segunda_division:{ sport:'soccer',league:'esp.2' },
    soccer_germany_bundesliga:{ sport:'soccer',league:'ger.1' },
    soccer_germany_bundesliga2:{ sport:'soccer',league:'ger.2' },
    soccer_italy_serie_a:{ sport:'soccer',league:'ita.1' },
    soccer_france_ligue_one:{ sport:'soccer',league:'fra.1' },
    soccer_portugal_primeira_liga:{ sport:'soccer',league:'por.1' },
    soccer_netherlands_eredivisie:{ sport:'soccer',league:'ned.1' },
    soccer_belgium_first_div:{ sport:'soccer',league:'bel.1' },
    soccer_turkey_super_league:{ sport:'soccer',league:'tur.1' },
    soccer_usa_mls:{ sport:'soccer',league:'usa.1' },
    soccer_mexico_ligamx:{ sport:'soccer',league:'mex.1' },
    soccer_brazil_campeonato:{ sport:'soccer',league:'bra.1' },
    soccer_argentina_primera_division:{ sport:'soccer',league:'arg.1' },
    soccer_chile_campeonato:{ sport:'soccer',league:'chi.1' },
    soccer_conmebol_copa_libertadores:{ sport:'soccer',league:'conmebol.libertadores' },
    soccer_uefa_champs_league:{ sport:'soccer',league:'UEFA.Champions_League' },
    soccer_uefa_europa_league:{ sport:'soccer',league:'UEFA.Europa_League' },
    basketball_nba:{ sport:'basketball',league:'nba' },
    basketball_nba_preseason:{ sport:'basketball',league:'nba' },
    basketball_wnba:{ sport:'basketball',league:'wnba' },
    basketball_ncaab:{ sport:'basketball',league:'mens-college-basketball' },
    baseball_mlb:{ sport:'baseball',league:'mlb' },
    baseball_mlb_preseason:{ sport:'baseball',league:'mlb' },
    baseball_ncaa:{ sport:'baseball',league:'college-baseball' }
  };

  // ── STATE ─────────────────────────────────────────────────────
  var eventsCache   = [];
  var espnTeamsMap  = {};
  var espnDataCache = {};
  var scanResults   = [];
  var evMinActive   = 0;
  var windCache     = {};
  var mlbScheduleCache = null;
  var mlbHittersCache  = null;

  // ── DOM ───────────────────────────────────────────────────────
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

  // ── HELPERS ───────────────────────────────────────────────────
  function showError(m){ errorMsg.textContent=m; errorDiv.style.display='block'; }
  function hideError(){ errorDiv.style.display='none'; }
  function setLoading(on){ loader.style.display=on?'block':'none'; }
  function oddsToProb(d){ return 1/d; }
  function clamp(v,mn,mx){ return Math.max(mn,Math.min(mx,v)); }

  function todayStr(){
    return new Date().toLocaleDateString('en-CA',{timeZone:'America/Panama'});
  }
  function formatGameTime(u){
    if(!u) return '—';
    return new Date(u).toLocaleTimeString('es-PA',{hour:'2-digit',minute:'2-digit',timeZone:'America/Panama'})+' (PTY)';
  }
  function isToday(u){
    if(!u) return false;
    var o={timeZone:'America/Panama'};
    return new Date(u).toLocaleDateString('es-PA',o)===new Date().toLocaleDateString('es-PA',o);
  }
  function getWindDir(d){ return ['Norte','Noreste','Este','Sureste','Sur','Suroeste','Oeste','Noroeste'][Math.round(d/45)%8]; }

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
    if(!form||!form.length) return null;
    var w=[1.0,0.9,0.8,0.7,0.6],total=0,max=0;
    form.slice().reverse().forEach(function(f,i){
      var wt=w[i]||0.5; max+=wt;
      if(f.result==='W') total+=wt;
      else if(f.result==='D') total+=wt*0.5;
    });
    return max>0?total/max:null;
  }

  function matchTeamName(nameA, nameB){
    var a=nameA.toLowerCase(), b=nameB.toLowerCase();
    if(a===b) return true;
    var aLast=a.split(' ').pop(), bLast=b.split(' ').pop();
    return a.includes(bLast)||b.includes(aLast);
  }

  // ── OPEN-METEO ────────────────────────────────────────────────
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

  // ── MLB STATS API ─────────────────────────────────────────────
  // Trae pitchers confirmados + récords de equipo para hoy
  async function fetchMLBSchedule(){
    if(mlbScheduleCache) return mlbScheduleCache;
    try{
      var date=todayStr();
      var url=MLBAPI+'/schedule?sportId=1&date='+date+'&hydrate=probablePitcher(stats),team(record),linescore';
      var res=await fetch(url);
      if(!res.ok) return {};
      var data=await res.json();
      var map={};
      (data.dates||[]).forEach(function(d){
        (d.games||[]).forEach(function(g){
          ['home','away'].forEach(function(side){
            var t=g.teams[side];
            var tName=t.team&&t.team.name;
            if(!tName) return;
            var rec=t.leagueRecord||{};
            var w=rec.wins||0, l=rec.losses||0;
            var pitcher=null;
            if(t.probablePitcher){
              var p=t.probablePitcher;
              var pStats={era:'—',wins:0,losses:0,ks:0,starts:0};
              (p.stats||[]).forEach(function(s){
                if(s.type&&s.type.displayName==='statsSingleSeason'&&s.group&&s.group.displayName==='pitching'){
                  var st=s.stats||{};
                  pStats.era   = st.era||'—';
                  pStats.wins  = st.wins||0;
                  pStats.losses= st.losses||0;
                  pStats.ks    = st.strikeOuts||0;
                  pStats.starts= st.gamesStarted||0;
                }
              });
              pitcher={ name:p.fullName||'TBD', era:pStats.era, wins:pStats.wins, losses:pStats.losses, ks:pStats.ks, starts:pStats.starts };
            }
            map[tName]={ pitcher:pitcher, wins:w, losses:l, games:w+l, teamId:t.team&&t.team.id };
          });
        });
      });
      mlbScheduleCache=map;
      return map;
    }catch(e){ return {}; }
  }

  // Trae top hitters de la liga y retorna mapa { teamId: [{ name, hits, gamesPlayed, hpg }] }
  async function fetchMLBHittingLeaders(){
    if(mlbHittersCache) return mlbHittersCache;
    try{
      var url=MLBAPI+'/stats/leaders?leaderCategories=hits&season=2026&sportId=1&limit=300&hydrate=person,team';
      var res=await fetch(url);
      if(!res.ok) return {};
      var data=await res.json();
      var byTeam={};
      var leaders=data.leagueLeaders&&data.leagueLeaders[0]&&data.leagueLeaders[0].leaders||[];
      leaders.forEach(function(l){
        var teamId=l.team&&l.team.id;
        var teamName=l.team&&l.team.name||'—';
        var pName=l.person&&l.person.fullName||'—';
        var hits=parseFloat(l.value)||0;
        if(!teamId) return;
        if(!byTeam[teamId]) byTeam[teamId]=[];
        byTeam[teamId].push({ name:pName, team:teamName, hits:hits, teamId:teamId });
      });
      mlbHittersCache=byTeam;
      return byTeam;
    }catch(e){ return {}; }
  }

  function getTopHitters(hittersByTeam, teamId, teamGames){
    if(!hittersByTeam||!teamId) return [];
    var list=hittersByTeam[teamId]||[];
    var gp=Math.max(teamGames||1,1);
    return list.slice(0,3).map(function(h){
      return { name:h.name, hits:h.hits, hpg:h.hits/gp };
    });
  }

  // ── ESPN (fútbol / basketball) ────────────────────────────────
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
      list.forEach(function(t){
        var team=t.team||t;
        if(team.displayName&&team.id) espnTeamsMap[team.displayName]={id:team.id,logo:(team.logos&&team.logos[0]&&team.logos[0].href)||''};
      });
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
      var rs=await Promise.all([
        fetch(ESPN+'/'+m.sport+'/'+m.league+'/teams/'+info.id),
        fetch(ESPN+'/'+m.sport+'/'+m.league+'/teams/'+info.id+'/schedule')
      ]);
      var tD=rs[0].ok?await rs[0].json():null;
      var sD=rs[1].ok?await rs[1].json():null;
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
      espnDataCache[teamName]=result;
      return result;
    }catch(e){return null;}
  }

  function renderTeamCard(data,teamName){
    if(!data) return '<div class="team-card"><h3>'+teamName+'</h3><div style="color:#555;font-size:0.8rem">Sin datos ESPN</div></div>';
    var ns=data.wins===0&&data.losses===0&&data.form.length===0;
    var fH=data.form.length?data.form.map(function(f){return '<div class="form-badge '+f.result+'" title="'+f.opponent+' '+f.score+'">'+f.result+'</div>';}).join(''):'<span style="color:#555;font-size:0.78rem">'+(ns?'🆕 Inicio de temporada':'Sin historial')+'</span>';
    var logo=data.logo?'<img class="team-logo" src="'+data.logo+'" onerror="this.style.display=\'none\'">':'';
    var fsV=data.formScore!==null?Math.round(data.formScore*100):null;
    var fsB=fsV!==null?'<div class="form-score-bar"><div class="form-score-label"><span>Forma ESPN</span><span>'+fsV+'%</span></div><div class="form-score-track"><div class="form-score-fill" style="width:'+fsV+'%;background:'+(fsV>=60?'#2cb67d':fsV>=40?'#ffd700':'#ff6b6b')+'"></div></div></div>':'';
    return '<div class="team-card"><h3>'+logo+' '+data.name+'</h3><div class="section-title">Forma reciente</div><div class="form-row">'+fH+'</div>'+fsB+'<div class="section-title">Temporada</div><div class="stat-row"><span>Victorias</span><span>'+(ns?'🆕':data.wins)+'</span></div><div class="stat-row"><span>Derrotas</span><span>'+(ns?'🆕':data.losses)+'</span></div>'+(data.pointsFor!=='—'?'<div class="stat-row"><span>Pts promedio</span><span>'+(typeof data.pointsFor==='number'?data.pointsFor.toFixed(1):data.pointsFor)+'</span></div>':'')+'</div>';
  }

  function renderCombinedScore(tA,tB,probA,probB,dataA,dataB){
    var fsA=dataA&&dataA.formScore!==null?dataA.formScore:0.5;
    var fsB=dataB&&dataB.formScore!==null?dataB.formScore:0.5;
    var hasE=(dataA&&dataA.formScore!==null)||(dataB&&dataB.formScore!==null);
    var cA=(probA*0.6)+(fsA*0.4), cB=(probB*0.6)+(fsB*0.4), tot=cA+cB;
    var pA=cA/tot, pB=cB/tot, diff=Math.abs(pA-pB);
    var cC=diff>0.15?'conf-high':diff>0.07?'conf-medium':'conf-low';
    var cT=diff>0.15?'🟢 Alta confianza':diff>0.07?'🟡 Confianza media':'🔴 Partido muy parejo';
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
  }  // ── MLB PANEL ─────────────────────────────────────────────────
  async function loadMLBGamesPanel(leagueKey){
    mlbPanel.style.display='flex'; mlbPanel.style.flexDirection='column'; mlbPanel.style.gap='14px';
    mlbPanel.innerHTML='<div style="text-align:center;color:#555;padding:24px;font-size:0.85rem">⏳ Cargando partidos, pitchers y estadísticas de bateo...</div>';
    var espnMap=ESPN_LEAGUE_MAP[leagueKey]||{sport:'baseball',league:'mlb'};
    var isMLB=leagueKey==='baseball_mlb'||leagueKey==='baseball_mlb_preseason';
    try{
      var fetchOdds=leagueKey!=='baseball_ncaa'
        ?fetch(BASE+'/sports/'+leagueKey+'/odds/?apiKey='+API_KEY+'&regions=eu&markets=h2h&oddsFormat=decimal')
        :Promise.resolve(null);

      var promises=[
        fetch(ESPN+'/'+espnMap.sport+'/'+espnMap.league+'/scoreboard'),
        fetchOdds
      ];
      if(isMLB){
        promises.push(fetchMLBSchedule());
        promises.push(fetchMLBHittingLeaders());
      }
      var rs=await Promise.all(promises);
      var scoreData=rs[0].ok?await rs[0].json():null;
      var oddsData=[];
      if(rs[1]&&rs[1].ok){
        oddsData=await rs[1].json(); if(!Array.isArray(oddsData)) oddsData=[];
        var rem=rs[1].headers.get('x-requests-remaining'), used=rs[1].headers.get('x-requests-used');
        if(rem!==null) quotaInfo.textContent='Créditos usados: '+used+' | Restantes: '+rem;
      }
      var mlbSchedule=isMLB?(rs[2]||{}):{};
      var mlbHitters =isMLB?(rs[3]||{}):{};

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
        var card=await buildGameCard(events[i],oddsData,mlbSchedule,mlbHitters,isMLB);
        mlbPanel.appendChild(card);
      }
    }catch(e){
      mlbPanel.innerHTML='<div style="color:#ff6b6b;padding:16px">❌ Error: '+e.message+'</div>';
    }
  }

  async function buildGameCard(ev,oddsData,mlbSchedule,mlbHitters,isMLB){
    var comp=ev.competitions&&ev.competitions[0];
    var homeC=((comp&&comp.competitors)||[]).find(function(c){return c.homeAway==='home';})||{};
    var awayC=((comp&&comp.competitors)||[]).find(function(c){return c.homeAway==='away';})||{};
    var homeTeam=(homeC.team&&homeC.team.displayName)||'—';
    var awayTeam=(awayC.team&&awayC.team.displayName)||'—';
    var homeAbbr=(homeC.team&&homeC.team.abbreviation)||homeTeam.substring(0,3).toUpperCase();
    var awayAbbr=(awayC.team&&awayC.team.abbreviation)||awayTeam.substring(0,3).toUpperCase();
    var homeLogo=(homeC.team&&homeC.team.logo)||'';
    var awayLogo=(awayC.team&&awayC.team.logo)||'';
    var gameTime=formatGameTime(ev.date);

    // ── Pitchers desde MLB Stats API ──────────────────────────
    var homeData=null, awayData=null;
    if(isMLB){
      // Buscar por nombre exacto primero, luego por apellido
      Object.keys(mlbSchedule).forEach(function(k){
        if(matchTeamName(k,homeTeam)) homeData=mlbSchedule[k];
        if(matchTeamName(k,awayTeam)) awayData=mlbSchedule[k];
      });
    }
    var homePitcher = homeData&&homeData.pitcher ? homeData.pitcher : {name:'TBD',era:'—',wins:0,losses:0,ks:0,starts:0};
    var awayPitcher = awayData&&awayData.pitcher ? awayData.pitcher : {name:'TBD',era:'—',wins:0,losses:0,ks:0,starts:0};

    // K/salida
    var homeKpg = homePitcher.starts>0 ? (homePitcher.ks/homePitcher.starts).toFixed(1) : '—';
    var awayKpg = awayPitcher.starts>0 ? (awayPitcher.ks/awayPitcher.starts).toFixed(1) : '—';

    // ── Récords de equipo ─────────────────────────────────────
    var homeW=homeData?homeData.wins:0, homeL=homeData?homeData.losses:0;
    var awayW=awayData?awayData.wins:0, awayL=awayData?awayData.losses:0;
    var homeGP=Math.max(homeW+homeL,1), awayGP=Math.max(awayW+awayL,1);
    var homeWP=homeGP>1?homeW/homeGP:0.5, awayWP=awayGP>1?awayW/awayGP:0.5;

    // ── Top bateadores ────────────────────────────────────────
    var homeTeamId=homeData&&homeData.teamId ? homeData.teamId : MLB_TEAM_IDS[homeTeam];
    var awayTeamId=awayData&&awayData.teamId ? awayData.teamId : MLB_TEAM_IDS[awayTeam];
    var homeHitters=getTopHitters(mlbHitters,homeTeamId,homeGP);
    var awayHitters=getTopHitters(mlbHitters,awayTeamId,awayGP);

    // ── Estadio + viento ──────────────────────────────────────
    var stadium=TEAM_STADIUM[homeTeam]||null;
    var wind=stadium?await fetchWindData(stadium.coords[0],stadium.coords[1]):null;

    // ── Odds ──────────────────────────────────────────────────
    var mktHome=0.5,mktAway=0.5,bestOddH=1,bestOddA=1,bkCount=0,oddsEv=null;
    oddsEv=oddsData.find(function(o){
      return matchTeamName(o.home_team,homeTeam)&&matchTeamName(o.away_team,awayTeam);
    })||oddsData.find(function(o){
      return matchTeamName(o.home_team,awayTeam)&&matchTeamName(o.away_team,homeTeam);
    });
    var oddsFlipped=false;
    if(oddsEv){
      oddsFlipped=matchTeamName(oddsEv.home_team,awayTeam);
      var pA=getAvgProb([oddsEv],oddsEv.home_team), pB=getAvgProb([oddsEv],oddsEv.away_team);
      if(pA&&pB){
        var tot=pA+pB, rH=pA/tot, rA=pB/tot;
        mktHome=oddsFlipped?rA:rH; mktAway=oddsFlipped?rH:rA;
        if(mktHome<0.05||mktAway<0.05){mktHome=0.5;mktAway=0.5;oddsEv=null;}
      }
      if(oddsEv){
        bestOddH=getBestOdd(oddsEv,oddsFlipped?oddsEv.away_team:oddsEv.home_team);
        bestOddA=getBestOdd(oddsEv,oddsFlipped?oddsEv.home_team:oddsEv.away_team);
        var bks=new Set(); oddsEv.bookmakers.forEach(function(b){bks.add(b.key);}); bkCount=bks.size;
      }
    }

    // ── Modelo mejorado con 4 señales ─────────────────────────
    //  1. Odds mercado (base)
    //  2. Pitcher ERA vs promedio liga
    //  3. Win % del equipo
    //  4. Park factor
    var pfAdj=(stadium?(stadium.pf-1)*0.04:0);

    var homeERA=homePitcher.era!=='—'?parseFloat(homePitcher.era):LEAGUE_AVG_ERA;
    var awayERA=awayPitcher.era!=='—'?parseFloat(awayPitcher.era):LEAGUE_AVG_ERA;
    // ERA bajo = mejor pitcher = ventaja para su equipo
    var homePitcherAdj=(LEAGUE_AVG_ERA-homeERA)*0.018;
    var awayPitcherAdj=(LEAGUE_AVG_ERA-awayERA)*0.018;

    // Win % solo si hay suficientes partidos (>5)
    var recAdj=0;
    if(homeGP>5&&awayGP>5) recAdj=(homeWP-awayWP)*0.12;

    var modelHome=clamp(mktHome+homePitcherAdj-awayPitcherAdj+recAdj+pfAdj,0.05,0.95);
    var modelAway=1-modelHome;
    var edgeH=modelHome-mktHome, edgeA=modelAway-mktAway;
    var betH=Math.abs(edgeH)>=Math.abs(edgeA);
    var betTeam=betH?homeTeam:awayTeam;
    var betEdge=betH?edgeH:edgeA;
    var betModel=betH?modelHome:modelAway;
    var betMkt=betH?mktHome:mktAway;
    var betOdd=betH?bestOddH:bestOddA;
    var evVal=oddsEv?(betModel*(betOdd-1))-(1-betModel):null;

    // ── Semáforo ──────────────────────────────────────────────
    var pitchConfirmed=homePitcher.name!=='TBD'||awayPitcher.name!=='TBD';
    var windBad=wind&&wind.speed>22;
    var goodOdds=oddsEv&&bkCount>=2&&betOdd>1.05&&betOdd<12;
    var recC,recL;

    if(oddsEv&&betEdge>0.06&&!windBad&&goodOdds&&pitchConfirmed){
      recC='rec-good'; recL='🟢 BUENO — Apostar: '+betTeam+' · Edge +'+Math.round(betEdge*100)+'%'+(evVal!==null?' · EV +'+(evVal*100).toFixed(1)+'¢':'');
    }else if(oddsEv&&betEdge>0.03&&goodOdds){
      recC='rec-tight'; recL='🟡 APRETADO — '+(pitchConfirmed?'Pitcher confirmado':'TBD')+' · Edge +'+Math.round(betEdge*100)+'%'+(windBad?' · Viento fuerte':'');
    }else if(oddsEv&&betEdge>0){
      recC='rec-avoid'; recL='🔴 EVITAR — Edge débil (+'+Math.round(betEdge*100)+'%) · '+(bkCount<2?'Pocas casas de apuestas':!pitchConfirmed?'Pitchers TBD':'Partido muy parejo');
    }else{
      recC='rec-avoid'; recL='🔴 EVITAR — '+(!oddsEv?'Sin odds disponibles':'Sin ventaja real');
    }

    // ── Render pitcher columna ────────────────────────────────
    function pitcherCol(p,kpg,label,hitters){
      var confirmed=p.name!=='TBD';
      var eraVal=confirmed&&p.era!=='—'?parseFloat(p.era):null;
      var eraC=eraVal!==null?(eraVal<3.50?'#2cb67d':eraVal<4.50?'#ffd700':'#ff6b6b'):'#aaa';
      var kVal=kpg!=='—'?parseFloat(kpg):null;
      var kC=kVal!==null?(kVal>=8?'#2cb67d':kVal>=6?'#ffd700':'#aaa'):'#aaa';
      var kStar=kVal>=8?' ⭐':kVal>=6?' ✔':'';
      return '<div class="mlb-team-col">'+
        '<div class="mlb-team-col-name">'+label+'</div>'+
        '<div class="mlb-row-section">⚾ Pitcher abridor</div>'+
        '<div class="mlb-row"><span>Nombre</span><span style="color:'+(confirmed?'#e0e0f0':'#666')+'">'+p.name+'</span></div>'+
        (confirmed?
          '<div class="mlb-row"><span>Récord</span><span>'+p.wins+'-'+p.losses+'</span></div>'+
          '<div class="mlb-row"><span>ERA</span><span style="color:'+eraC+'">'+(p.era||'—')+'</span></div>'+
          '<div class="mlb-row"><span>K/salida</span><span style="color:'+kC+'">'+kpg+kStar+'</span></div>'
        :'')+
        '<div class="mlb-row-section">🏏 Top bateadores (H/G)</div>'+
        (hitters&&hitters.length?hitters.map(function(h){
          var hC=h.hpg>=1.2?'#2cb67d':h.hpg>=0.8?'#ffd700':'#aaa';
          return '<div class="mlb-row"><span>'+h.name.split(' ').pop()+'</span><span style="color:'+hC+'">'+h.hpg.toFixed(2)+' H/G</span></div>';
        }).join(''):'<div style="color:#444;font-size:0.75rem;padding:3px 0">Sin datos suficientes</div>')+
      '</div>';
    }

    // ── Odds grid ─────────────────────────────────────────────
    var oddsHTML=oddsEv?
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px;margin-top:8px">'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">'+homeAbbr+' Mercado</div><div class="mlb-odd-value" style="color:#e0e0f0">'+Math.round(mktHome*100)+'%</div></div>'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">'+awayAbbr+' Mercado</div><div class="mlb-odd-value" style="color:#e0e0f0">'+Math.round(mktAway*100)+'%</div></div>'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">'+homeAbbr+' Modelo</div><div class="mlb-odd-value" style="color:'+(edgeH>0.03?'#2cb67d':'#aaa')+'">'+Math.round(modelHome*100)+'%</div></div>'+
        '<div class="mlb-odd-box"><div class="mlb-odd-label">Mejor odd</div><div class="mlb-odd-value" style="color:#ffd700">'+(betH?bestOddH:bestOddA).toFixed(2)+'</div></div>'+
      '</div>'
    :'<div style="color:#555;font-size:0.78rem;margin-top:6px;padding:8px;background:#1a1a2e;border-radius:8px">Sin odds disponibles para este partido</div>';

    // ── Estadio + viento ──────────────────────────────────────
    var extrasHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px">';
    if(stadium){
      var pfC=stadium.pf>=1.10?'#ff6b6b':stadium.pf<=0.90?'#2cb67d':'#ffd700';
      var pfT=stadium.pf>=1.10?' 🔥 Favorece runs':stadium.pf<=0.90?' 🛡️ Suprime runs':' ⚖️ Neutro';
      extrasHTML+='<div class="mlb-extra-mini"><div class="mlb-extra-mini-label">🏟️ Estadio</div><div class="mlb-extra-mini-value">'+stadium.name+'</div><div style="font-size:0.68rem;color:'+pfC+'">PF ×'+stadium.pf.toFixed(2)+pfT+'</div></div>';
    }
    if(wind){
      var wIcon=wind.speed>22?'💨':wind.speed>12?'🌬️':'🍃';
      var wNote=wind.speed>18?' · Puede afectar jonrones':'';
      extrasHTML+='<div class="mlb-extra-mini"><div class="mlb-extra-mini-label">'+wIcon+' Viento</div><div class="mlb-extra-mini-value">'+wind.speed+' km/h → '+getWindDir(wind.direction)+wNote+'</div><div style="font-size:0.68rem;color:#666">🌡️ '+wind.temp+'°C</div></div>';
    }
    extrasHTML+='</div>';

    // ── Récords ───────────────────────────────────────────────
    var recStr='';
    if(homeGP>0||awayGP>0){
      recStr='<div style="display:flex;gap:8px;font-size:0.75rem;color:#888;margin-top:2px">'+
        '<span>'+homeAbbr+': <b style="color:#e0e0f0">'+homeW+'-'+homeL+'</b></span>'+
        '<span style="color:#555">|</span>'+
        '<span>'+awayAbbr+': <b style="color:#e0e0f0">'+awayW+'-'+awayL+'</b></span>'+
      '</div>';
    }

    var div=document.createElement('div');
    div.style.cssText='background:#0f0f1a;border:1px solid #2a2a4a;border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px';
    div.innerHTML=
      '<div style="font-size:0.72rem;color:#7f5af0">⏰ '+gameTime+'</div>'+
      '<div style="font-size:1rem;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
        (homeLogo?'<img src="'+homeLogo+'" style="width:22px;height:22px;object-fit:contain" onerror="this.style.display=\'none\'">':'')+
        homeTeam+'<span style="color:#555">vs</span>'+
        (awayLogo?'<img src="'+awayLogo+'" style="width:22px;height:22px;object-fit:contain" onerror="this.style.display=\'none\'">':'')+
        awayTeam+
      '</div>'+
      recStr+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
        pitcherCol(homePitcher,homeKpg,'🏠 Local',homeHitters)+
        pitcherCol(awayPitcher,awayKpg,'✈️ Visita',awayHitters)+
      '</div>'+
      extrasHTML+
      oddsHTML+
      '<div class="mlb-rec-badge '+recC+'">'+recL+'</div>';
    return div;
  }

  // ── SPORT SELECTOR ────────────────────────────────────────────
  sportSelect.addEventListener('change', function(){
    var sport=this.value;
    hideError();
    resultDiv.style.display='none'; combinedDiv.style.display='none';
    espnPanel.style.display='none'; scannerPanel.style.display='none';
    scannerPanel.innerHTML=''; evFilterRow.style.display='none';
    mlbPanel.style.display='none'; mlbPanel.innerHTML='';
    eventsCache=[]; espnTeamsMap={}; espnDataCache={};
    scanResults=[]; windCache={}; mlbScheduleCache=null; mlbHittersCache=null;
    leagueSelect.innerHTML='<option value="">— Elige una liga —</option>';
    leagueSelect.disabled=!sport;
    teamA.innerHTML='<option value="">— Primero elige liga —</option>'; teamA.disabled=true;
    teamB.innerHTML='<option value="">— Primero elige liga —</option>'; teamB.disabled=true;
    predictBtn.disabled=true; scanBtn.disabled=true;
    v1Panel.style.display='none';
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
    espnDataCache={}; scanResults={}; mlbScheduleCache=null; mlbHittersCache=null;
    scanBtn.disabled=true;
    if(!leagueKey){
      v1Panel.style.display='none';
      teamA.innerHTML='<option value="">— Elige liga primero —</option>'; teamA.disabled=true;
      teamB.innerHTML='<option value="">— Elige liga primero —</option>'; teamB.disabled=true;
      predictBtn.disabled=true; return;
    }
    var sport=sportSelect.value;
    var leagueCfg=(LEAGUES[sport]||[]).find(function(l){return l.key===leagueKey;});
    var isPanel=leagueCfg&&leagueCfg.panel;

    if(isPanel){
      v1Panel.style.display='none';
      mlbPanel.style.display='flex';
      await loadMLBGamesPanel(leagueKey);
    }else{
      v1Panel.style.display='flex';
      var staticTeams=(leagueCfg&&leagueCfg.staticTeams)||[];
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
    if(!rel.length) rel=eventsCache.filter(function(e){return e.home_team===tA||e.away_team===tA||e.home_team===tB||e.away_team===tB;});
    var probA=0.5,probB=0.5;
    if(rel.length>0){
      var pAr=getAvgProb(rel,tA),pBr=getAvgProb(rel,tB);
      if(pAr!==null&&pBr!==null){
        var tot=pAr+pBr; probA=pAr/tot; probB=pBr/tot;
        var bks=new Set(); rel.forEach(function(e){e.bookmakers.forEach(function(b){bks.add(b.key);});});
        document.getElementById('winnerName').textContent='🏆 '+(probA>=probB?tA:tB);
        document.getElementById('bookmakerCount').textContent='Basado en '+bks.size+' casas de apuestas';
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

  // ── SCANNER (fútbol / basketball) ─────────────────────────────
  function renderScannerResults(){
    var filtered=scanResults.filter(function(r){return r.ev>=evMinActive;});
    scannerPanel.querySelectorAll('.scanner-card').forEach(function(c){c.remove();});
    var hdr=scannerPanel.querySelector('.scanner-header');
    if(!hdr){hdr=document.createElement('div');hdr.className='scanner-header';hdr.style.cssText='font-size:0.75rem;color:#f7971e;text-transform:uppercase;letter-spacing:0.08em;padding:4px 0';scannerPanel.appendChild(hdr);}
    if(!filtered.length){hdr.textContent='❌ No hay partidos con EV ≥ '+Math.round(evMinActive*100)+'%';return;}
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
    if(!eventsCache.length) return;
    scanBtn.disabled=true; scanBtn.textContent='⏳ Escaneando...';
    scannerPanel.style.display='flex'; scannerPanel.innerHTML='<div style="color:#555;font-size:0.85rem;text-align:center;padding:8px">Analizando partidos de hoy...</div>';
    scanResults=[];
    var leagueKey=leagueSelect.value, sport=sportSelect.value;
    for(var i=0;i<eventsCache.length;i++){
      var ev=eventsCache[i]; if(!isToday(ev.commence_time)) continue;
      var tA=ev.home_team, tB=ev.away_team;
      var pAr=getAvgProb([ev],tA), pBr=getAvgProb([ev],tB);
      if(!pAr||!pBr) continue;
      var tot=pAr+pBr, mA=pAr/tot, mB=pBr/tot;
      if(mA<0.05||mB<0.05) continue;
      var dataA=await fetchESPNTeamData(leagueKey,tA), dataB=await fetchESPNTeamData(leagueKey,tB);
      var fsA=dataA&&dataA.formScore!==null?dataA.formScore:0.5;
      var fsB=dataB&&dataB.formScore!==null?dataB.formScore:0.5;
      var cA=(mA*0.6)+(fsA*0.4), cB=(mB*0.6)+(fsB*0.4), totC=cA+cB;
      var modA=cA/totC, modB=cB/totC;
      var edgeA=modA-mA, edgeB=modB-mB;
      if(Math.max(Math.abs(edgeA),Math.abs(edgeB))<0.05) continue;
      var betH=edgeA>=edgeB;
      var betTeam=betH?tA:tB, betEdge=betH?edgeA:edgeB, betModel=betH?modA:modB, betMkt=betH?mA:mB;
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
