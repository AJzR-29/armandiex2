document.addEventListener('DOMContentLoaded', function () {

  var API_KEY = '27efeb9368c8c4d45c578bb7d0136365';
  var BASE    = 'https://api.the-odds-api.com/v4';
  var ESPN    = 'https://site.api.espn.com/apis/site/v2/sports';

  // ── TIMEZONE PANAMÁ ──────────────────────────────────
  function formatGameTime(utcString) {
    if (!utcString) return '—';
    var d = new Date(utcString);
    return d.toLocaleTimeString('es-PA', {
      hour: '2-digit', minute: '2-digit',
      timeZone: 'America/Panama'
    }) + ' (PTY)';
  }

  function isToday(utcString) {
    if (!utcString) return false;
    var d    = new Date(utcString);
    var now  = new Date();
    var pty  = { timeZone: 'America/Panama' };
    return d.toLocaleDateString('es-PA', pty) === now.toLocaleDateString('es-PA', pty);
  }

  // ── LEAGUE / TEAM MAPS ───────────────────────────────
  var ESPN_LEAGUE_MAP = {
    soccer_epl:                        { sport: 'soccer',     league: 'eng.1' },
    soccer_spain_la_liga:              { sport: 'soccer',     league: 'esp.1' },
    soccer_spain_segunda_division:     { sport: 'soccer',     league: 'esp.2' },
    soccer_germany_bundesliga:         { sport: 'soccer',     league: 'ger.1' },
    soccer_germany_bundesliga2:        { sport: 'soccer',     league: 'ger.2' },
    soccer_italy_serie_a:              { sport: 'soccer',     league: 'ita.1' },
    soccer_italy_serie_b:              { sport: 'soccer',     league: 'ita.2' },
    soccer_france_ligue_one:           { sport: 'soccer',     league: 'fra.1' },
    soccer_france_ligue_two:           { sport: 'soccer',     league: 'fra.2' },
    soccer_portugal_primeira_liga:     { sport: 'soccer',     league: 'por.1' },
    soccer_netherlands_eredivisie:     { sport: 'soccer',     league: 'ned.1' },
    soccer_belgium_first_div:          { sport: 'soccer',     league: 'bel.1' },
    soccer_turkey_super_league:        { sport: 'soccer',     league: 'tur.1' },
    soccer_spl:                        { sport: 'soccer',     league: 'sco.1' },
    soccer_usa_mls:                    { sport: 'soccer',     league: 'usa.1' },
    soccer_mexico_ligamx:              { sport: 'soccer',     league: 'mex.1' },
    soccer_brazil_campeonato:          { sport: 'soccer',     league: 'bra.1' },
    soccer_argentina_primera_division: { sport: 'soccer',     league: 'arg.1' },
    soccer_chile_campeonato:           { sport: 'soccer',     league: 'chi.1' },
    soccer_saudi_arabia_pro_league:    { sport: 'soccer',     league: 'sau.1' },
    soccer_japan_j_league:             { sport: 'soccer',     league: 'jpn.1' },
    soccer_australia_aleague:          { sport: 'soccer',     league: 'aus.1' },
    soccer_uefa_champs_league:         { sport: 'soccer',     league: 'UEFA.Champions_League' },
    soccer_uefa_europa_league:         { sport: 'soccer',     league: 'UEFA.Europa_League' },
    soccer_conmebol_copa_libertadores: { sport: 'soccer',     league: 'conmebol.libertadores' },
    basketball_nba:                    { sport: 'basketball', league: 'nba' },
    basketball_nba_preseason:          { sport: 'basketball', league: 'nba' },
    basketball_wnba:                   { sport: 'basketball', league: 'wnba' },
    basketball_ncaab:                  { sport: 'basketball', league: 'mens-college-basketball' },
    baseball_mlb:                      { sport: 'baseball',   league: 'mlb' },
    baseball_mlb_preseason:            { sport: 'baseball',   league: 'mlb' }
  };

  var NBA_TEAMS = [
    'Atlanta Hawks','Boston Celtics','Brooklyn Nets','Charlotte Hornets',
    'Chicago Bulls','Cleveland Cavaliers','Dallas Mavericks','Denver Nuggets',
    'Detroit Pistons','Golden State Warriors','Houston Rockets','Indiana Pacers',
    'Los Angeles Clippers','Los Angeles Lakers','Memphis Grizzlies','Miami Heat',
    'Milwaukee Bucks','Minnesota Timberwolves','New Orleans Pelicans','New York Knicks',
    'Oklahoma City Thunder','Orlando Magic','Philadelphia 76ers','Phoenix Suns',
    'Portland Trail Blazers','Sacramento Kings','San Antonio Spurs','Toronto Raptors',
    'Utah Jazz','Washington Wizards'
  ];

  var MLB_TEAMS = [
    'Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox',
    'Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Guardians',
    'Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals',
    'Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers',
    'Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics',
    'Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants',
    'Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers',
    'Toronto Blue Jays','Washington Nationals'
  ];

  var LEAGUES = {
    soccer: [
      { key: 'soccer_uefa_champs_league',               title: '🏆 UEFA Champions League' },
      { key: 'soccer_uefa_champs_league_qualification', title: '🏆 UCL Clasificación' },
      { key: 'soccer_uefa_europa_league',               title: '🏆 UEFA Europa League' },
      { key: 'soccer_uefa_europa_conference_league',    title: '🏆 UEFA Conference League' },
      { key: 'soccer_uefa_nations_league',              title: '🏆 UEFA Nations League' },
      { key: 'soccer_epl',                              title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League' },
      { key: 'soccer_efl_champ',                        title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Championship' },
      { key: 'soccer_england_league1',                  title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 League 1' },
      { key: 'soccer_england_league2',                  title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 League 2' },
      { key: 'soccer_fa_cup',                           title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 FA Cup' },
      { key: 'soccer_england_efl_cup',                  title: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 EFL Cup' },
      { key: 'soccer_spain_la_liga',                    title: '🇪🇸 La Liga' },
      { key: 'soccer_spain_segunda_division',           title: '🇪🇸 La Liga 2' },
      { key: 'soccer_spain_copa_del_rey',               title: '🇪🇸 Copa del Rey' },
      { key: 'soccer_germany_bundesliga',               title: '🇩🇪 Bundesliga' },
      { key: 'soccer_germany_bundesliga2',              title: '🇩🇪 Bundesliga 2' },
      { key: 'soccer_germany_liga3',                    title: '🇩🇪 3. Liga' },
      { key: 'soccer_germany_dfb_pokal',                title: '🇩🇪 DFB-Pokal' },
      { key: 'soccer_italy_serie_a',                    title: '🇮🇹 Serie A' },
      { key: 'soccer_italy_serie_b',                    title: '🇮🇹 Serie B' },
      { key: 'soccer_italy_coppa_italia',               title: '🇮🇹 Coppa Italia' },
      { key: 'soccer_france_ligue_one',                 title: '🇫🇷 Ligue 1' },
      { key: 'soccer_france_ligue_two',                 title: '🇫🇷 Ligue 2' },
      { key: 'soccer_france_coupe_de_france',           title: '🇫🇷 Coupe de France' },
      { key: 'soccer_portugal_primeira_liga',           title: '🇵🇹 Primeira Liga' },
      { key: 'soccer_netherlands_eredivisie',           title: '🇳🇱 Eredivisie' },
      { key: 'soccer_belgium_first_div',                title: '🇧🇪 First Division A' },
      { key: 'soccer_spl',                              title: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Premiership' },
      { key: 'soccer_turkey_super_league',              title: '🇹🇷 Süper Lig' },
      { key: 'soccer_greece_super_league',              title: '🇬🇷 Super League' },
      { key: 'soccer_austria_bundesliga',               title: '🇦🇹 Bundesliga Austria' },
      { key: 'soccer_switzerland_superleague',          title: '🇨🇭 Super League Suiza' },
      { key: 'soccer_poland_ekstraklasa',               title: '🇵🇱 Ekstraklasa' },
      { key: 'soccer_denmark_superliga',                title: '🇩🇰 Superliga Dinamarca' },
      { key: 'soccer_norway_eliteserien',               title: '🇳🇴 Eliteserien' },
      { key: 'soccer_sweden_allsvenskan',               title: '🇸🇪 Allsvenskan' },
      { key: 'soccer_conmebol_copa_libertadores',       title: '🌎 Copa Libertadores' },
      { key: 'soccer_conmebol_copa_sudamericana',       title: '🌎 Copa Sudamericana' },
      { key: 'soccer_conmebol_copa_america',            title: '🌎 Copa América' },
      { key: 'soccer_argentina_primera_division',       title: '🇦🇷 Primera División Argentina' },
      { key: 'soccer_brazil_campeonato',                title: '🇧🇷 Brasileirão Série A' },
      { key: 'soccer_brazil_serie_b',                   title: '🇧🇷 Brasileirão Série B' },
      { key: 'soccer_chile_campeonato',                 title: '🇨🇱 Primera División Chile' },
      { key: 'soccer_mexico_ligamx',                    title: '🇲🇽 Liga MX' },
      { key: 'soccer_usa_mls',                          title: '🇺🇸 MLS' },
      { key: 'soccer_saudi_arabia_pro_league',          title: '🇸🇦 Saudi Pro League' },
      { key: 'soccer_japan_j_league',                   title: '🇯🇵 J League' },
      { key: 'soccer_korea_kleague1',                   title: '🇰🇷 K League 1' },
      { key: 'soccer_australia_aleague',                title: '🇦🇺 A-League' },
      { key: 'soccer_fifa_world_cup',                   title: '🌍 FIFA World Cup' },
      { key: 'soccer_fifa_club_world_cup',              title: '🌍 FIFA Club World Cup' }
    ],
    basketball: [
      { key: 'basketball_nba',                     title: '🇺🇸 NBA',           staticTeams: NBA_TEAMS },
      { key: 'basketball_nba_preseason',           title: '🇺🇸 NBA Preseason', staticTeams: NBA_TEAMS },
      { key: 'basketball_nba_all_stars',           title: '🇺🇸 NBA All Star' },
      { key: 'basketball_nba_championship_winner', title: '🇺🇸 NBA Championship (Futuros)' },
      { key: 'basketball_wnba',                    title: '🇺🇸 WNBA' },
      { key: 'basketball_ncaab',                   title: '🇺🇸 NCAA Basketball' },
      { key: 'basketball_euroleague',              title: '🇪🇺 EuroLeague' },
      { key: 'basketball_nbl',                     title: '🇦🇺 NBL Australia' }
    ],
    baseball: [
      { key: 'baseball_mlb',                     title: '🇺🇸 MLB',           staticTeams: MLB_TEAMS },
      { key: 'baseball_mlb_preseason',           title: '🇺🇸 MLB Preseason', staticTeams: MLB_TEAMS },
      { key: 'baseball_mlb_world_series_winner', title: '🇺🇸 MLB World Series (Futuros)' },
      { key: 'baseball_npb',                     title: '🇯🇵 NPB Japón' },
      { key: 'baseball_kbo',                     title: '🇰🇷 KBO Corea' }
    ]
  };

  // ── DOM REFS ─────────────────────────────────────────
  var sportSelect   = document.getElementById('sportSelect');
  var leagueSelect  = document.getElementById('leagueSelect');
  var teamA         = document.getElementById('teamA');
  var teamB         = document.getElementById('teamB');
  var predictBtn    = document.getElementById('predictBtn');
  var loader        = document.getElementById('loader');
  var errorDiv      = document.getElementById('error');
  var errorMsg      = document.getElementById('errorMsg');
  var resultDiv     = document.getElementById('result');
  var combinedDiv   = document.getElementById('combinedScore');
  var espnPanel     = document.getElementById('espnPanel');
  var espnGrid      = document.getElementById('espnGrid');
  var quotaInfo     = document.getElementById('quotaInfo');
  var scanBtn       = document.getElementById('scanBtn');
  var scannerPanel  = document.getElementById('scannerPanel');
  var evFilterRow   = document.getElementById('evFilterRow');

  var eventsCache   = [];
  var espnTeamsMap  = {};
  var espnDataCache = {};
  var scanResults   = [];
  var evMinActive   = 0;

  // ── HELPERS ──────────────────────────────────────────
  function showError(msg) { errorMsg.textContent = msg; errorDiv.style.display = 'block'; }
  function hideError()    { errorDiv.style.display = 'none'; }
  function setLoading(on) { loader.style.display = on ? 'block' : 'none'; }
  function oddsToProb(d)  { return 1 / d; }

  function getAvgProb(events, name) {
    var total = 0, count = 0;
    events.forEach(function (ev) {
      if (ev.home_team !== name && ev.away_team !== name) return;
      ev.bookmakers.forEach(function (bk) {
        var h2h = bk.markets.find(function (m) { return m.key === 'h2h'; });
        if (!h2h) return;
        var out = h2h.outcomes.find(function (o) { return o.name === name; });
        if (out) { total += oddsToProb(out.price); count++; }
      });
    });
    return count > 0 ? total / count : null;
  }

  function getBestOdd(ev, teamName) {
    var best = 1;
    ev.bookmakers.forEach(function (bk) {
      var h2h = bk.markets.find(function (m) { return m.key === 'h2h'; });
      if (!h2h) return;
      var out = h2h.outcomes.find(function (o) { return o.name === teamName; });
      if (out && out.price > best) best = out.price;
    });
    return best;
  }

  function calcFormScore(form) {
    if (!form || form.length === 0) return null;
    var weights = [1.0, 0.9, 0.8, 0.7, 0.6];
    var total = 0, maxTotal = 0;
    form.slice().reverse().forEach(function (f, i) {
      var w = weights[i] || 0.5;
      maxTotal += w;
      if (f.result === 'W') total += w;
      else if (f.result === 'D') total += w * 0.5;
    });
    return maxTotal > 0 ? total / maxTotal : null;
  }

  function populateTeams(events, staticTeams) {
    var teams = new Set(staticTeams || []);
    events.forEach(function (e) { teams.add(e.home_team); teams.add(e.away_team); });
    var sorted = Array.from(teams).sort();
    [teamA, teamB].forEach(function (sel) {
      sel.innerHTML = '<option value="">— Elige un equipo —</option>';
      sorted.forEach(function (t) {
        var opt = document.createElement('option');
        opt.value = t; opt.textContent = t;
        sel.appendChild(opt);
      });
      sel.disabled = false;
    });
  }

  // ── ESPN ─────────────────────────────────────────────
  async function loadESPNTeams(leagueKey) {
    var m = ESPN_LEAGUE_MAP[leagueKey];
    if (!m) return;
    try {
      var res  = await fetch(ESPN + '/' + m.sport + '/' + m.league + '/teams?limit=100');
      if (!res.ok) return;
      var data = await res.json();
      var list = (data.sports && data.sports[0] && data.sports[0].leagues && data.sports[0].leagues[0] && data.sports[0].leagues[0].teams) || data.teams || [];
      list.forEach(function (t) {
        var team = t.team || t;
        if (team.displayName && team.id)
          espnTeamsMap[team.displayName] = { id: team.id, logo: (team.logos && team.logos[0] && team.logos[0].href) || '' };
      });
    } catch (e) {}
  }

  async function fetchESPNTeamData(leagueKey, teamName) {
    if (espnDataCache[teamName]) return espnDataCache[teamName];
    var m = ESPN_LEAGUE_MAP[leagueKey];
    if (!m) return null;
    var info = espnTeamsMap[teamName];
    if (!info) {
      var lastName = teamName.toLowerCase().split(' ').pop();
      var key = Object.keys(espnTeamsMap).find(function (k) {
        return k.toLowerCase().includes(lastName) || teamName.toLowerCase().includes(k.toLowerCase().split(' ').pop());
      });
      info = key ? espnTeamsMap[key] : null;
    }
    if (!info) return null;
    try {
      var responses = await Promise.all([
        fetch(ESPN + '/' + m.sport + '/' + m.league + '/teams/' + info.id),
        fetch(ESPN + '/' + m.sport + '/' + m.league + '/teams/' + info.id + '/schedule')
      ]);
      var tData = responses[0].ok ? await responses[0].json() : null;
      var sData = responses[1].ok ? await responses[1].json() : null;
      var form  = [];
      if (sData) {
        var played = (sData.events || []).filter(function (e) {
          return e.competitions && e.competitions[0] && e.competitions[0].status &&
                 e.competitions[0].status.type && e.competitions[0].status.type.completed;
        });
        form = played.slice(-5).map(function (e) {
          var comp = e.competitions[0];
          var mine = comp.competitors.find(function (c) { return c.team && c.team.id === info.id; });
          var opp  = comp.competitors.find(function (c) { return c.team && c.team.id !== info.id; });
          var ms   = Number(mine && mine.score) || 0;
          var os   = Number(opp  && opp.score)  || 0;
          return {
            result:   ms > os ? 'W' : ms < os ? 'L' : 'D',
            score:    ms + '-' + os,
            opponent: (opp && opp.team && opp.team.shortDisplayName) || '?',
            date:     e.date ? e.date.substring(0, 10) : ''
          };
        });
      }
      var record = tData && tData.team && tData.team.record && tData.team.record.items && tData.team.record.items[0];
      var stats  = {};
      if (record && record.stats) record.stats.forEach(function (s) { stats[s.name] = s.value; });
      var result = {
        name:       (tData && tData.team && tData.team.displayName) || teamName,
        logo:       info.logo,
        wins:       stats.wins    !== undefined ? stats.wins    : '—',
        losses:     stats.losses  !== undefined ? stats.losses  : '—',
        pointsFor:  stats.pointsFor !== undefined ? stats.pointsFor : (stats.avgPoints !== undefined ? stats.avgPoints : '—'),
        form:       form,
        formScore:  calcFormScore(form)
      };
      espnDataCache[teamName] = result;
      return result;
    } catch (e) { return null; }
  }

  function renderTeamCard(data, teamName) {
    if (!data) return '<div class="team-card"><h3>' + teamName + '</h3><div style="color:#555;font-size:0.8rem">Sin datos ESPN para esta liga</div></div>';
    var formHTML = data.form.length
      ? data.form.map(function (f) { return '<div class="form-badge ' + f.result + '" title="' + f.opponent + ' ' + f.score + ' (' + f.date + ')">' + f.result + '</div>'; }).join('')
      : '<span style="color:#555;font-size:0.78rem">Sin historial reciente</span>';
    var logo  = data.logo ? '<img class="team-logo" src="' + data.logo + '" onerror="this.style.display=\'none\'">' : '';
    var fsVal = data.formScore !== null ? Math.round(data.formScore * 100) : null;
    var fsBar = fsVal !== null
      ? '<div class="form-score-bar"><div class="form-score-label"><span>Forma ESPN</span><span>' + fsVal + '%</span></div><div class="form-score-track"><div class="form-score-fill" style="width:' + fsVal + '%;background:' + (fsVal >= 60 ? '#2cb67d' : fsVal >= 40 ? '#ffd700' : '#ff6b6b') + '"></div></div></div>'
      : '';
    return '<div class="team-card"><h3>' + logo + ' ' + data.name + '</h3>' +
      '<div class="section-title">Forma reciente</div><div class="form-row">' + formHTML + '</div>' + fsBar +
      '<div class="section-title">Temporada</div>' +
      '<div class="stat-row"><span>Victorias</span><span>' + data.wins + '</span></div>' +
      '<div class="stat-row"><span>Derrotas</span><span>' + data.losses + '</span></div>' +
      (data.pointsFor !== '—' ? '<div class="stat-row"><span>Pts promedio</span><span>' + (typeof data.pointsFor === 'number' ? data.pointsFor.toFixed(1) : data.pointsFor) + '</span></div>' : '') +
      '</div>';
  }

  function renderCombinedScore(tA, tB, probA, probB, dataA, dataB) {
    var fsA      = dataA && dataA.formScore !== null ? dataA.formScore : 0.5;
    var fsB      = dataB && dataB.formScore !== null ? dataB.formScore : 0.5;
    var hasESPN  = (dataA && dataA.formScore !== null) || (dataB && dataB.formScore !== null);
    var combA    = (probA * 0.6) + (fsA * 0.4);
    var combB    = (probB * 0.6) + (fsB * 0.4);
    var total    = combA + combB;
    var pA = combA / total, pB = combB / total;
    var winner   = pA >= pB ? tA : tB;
    var diff     = Math.abs(pA - pB);
    var confClass, confText;
    if (diff > 0.15)      { confClass = 'conf-high';   confText = '🟢 Alta confianza'; }
    else if (diff > 0.07) { confClass = 'conf-medium'; confText = '🟡 Confianza media'; }
    else                  { confClass = 'conf-low';    confText = '🔴 Partido muy parejo'; }
    document.getElementById('combinedWinner').textContent = '🏆 ' + winner;
    document.getElementById('combinedSub').textContent    = hasESPN ? 'Odds del mercado (60%) + Forma reciente ESPN (40%)' : 'Solo odds — sin datos ESPN para esta liga';
    document.getElementById('cbNameA').textContent   = tA;
    document.getElementById('cbScoreA').textContent  = Math.round(pA * 100) + '%';
    document.getElementById('cbDetailA').textContent = 'Odds: ' + Math.round(probA * 100) + '% · Forma: ' + (dataA && dataA.formScore !== null ? Math.round(fsA * 100) + '%' : 'N/A');
    document.getElementById('cbNameB').textContent   = tB;
    document.getElementById('cbScoreB').textContent  = Math.round(pB * 100) + '%';
    document.getElementById('cbDetailB').textContent = 'Odds: ' + Math.round(probB * 100) + '% · Forma: ' + (dataB && dataB.formScore !== null ? Math.round(fsB * 100) + '%' : 'N/A');
    document.getElementById('cbBoxA').className = 'combined-bar-item' + (pA >= pB ? ' best' : '');
    document.getElementById('cbBoxB').className = 'combined-bar-item' + (pB > pA  ? ' best' : '');
    document.getElementById('confidenceBadge').innerHTML = '<span class="confidence-badge ' + confClass + '">' + confText + '</span>';
    combinedDiv.style.display = 'block';
  }

  // ── SPORT / LEAGUE SELECTORS ─────────────────────────
  sportSelect.addEventListener('change', function () {
    var sport = this.value;
    hideError();
    resultDiv.style.display = 'none'; combinedDiv.style.display = 'none';
    espnPanel.style.display = 'none'; scannerPanel.style.display = 'none';
    scannerPanel.innerHTML  = ''; evFilterRow.style.display = 'none';
    eventsCache = []; espnTeamsMap = {}; espnDataCache = {}; scanResults = [];
    leagueSelect.innerHTML = '<option value="">— Elige una liga —</option>';
    leagueSelect.disabled  = !sport;
    teamA.innerHTML = '<option value="">— Primero elige liga —</option>'; teamA.disabled = true;
    teamB.innerHTML = '<option value="">— Primero elige liga —</option>'; teamB.disabled = true;
    predictBtn.disabled = true; scanBtn.disabled = true;
    if (!sport) return;
    (LEAGUES[sport] || []).forEach(function (l) {
      var opt = document.createElement('option');
      opt.value = l.key; opt.textContent = l.title;
      leagueSelect.appendChild(opt);
    });
  });

  leagueSelect.addEventListener('change', async function () {
    var leagueKey = this.value;
    hideError();
    resultDiv.style.display = 'none'; combinedDiv.style.display = 'none';
    espnPanel.style.display = 'none'; scannerPanel.style.display = 'none';
    scannerPanel.innerHTML  = ''; evFilterRow.style.display = 'none';
    espnDataCache = {}; scanResults = [];
    scanBtn.disabled = true;
    if (!leagueKey) {
      teamA.innerHTML = '<option value="">— Elige liga primero —</option>'; teamA.disabled = true;
      teamB.innerHTML = '<option value="">— Elige liga primero —</option>'; teamB.disabled = true;
      predictBtn.disabled = true; return;
    }
    teamA.innerHTML = '<option value="">— Cargando... —</option>'; teamA.disabled = true;
    teamB.innerHTML = '<option value="">— Cargando... —</option>'; teamB.disabled = true;
    predictBtn.disabled = true; setLoading(true);
    try {
      var sport        = sportSelect.value;
      var leagueConfig = (LEAGUES[sport] || []).find(function (l) { return l.key === leagueKey; });
      var staticTeams  = leagueConfig && leagueConfig.staticTeams ? leagueConfig.staticTeams : [];
      var responses    = await Promise.all([
        fetch(BASE + '/sports/' + leagueKey + '/odds/?apiKey=' + API_KEY + '&regions=eu&markets=h2h&oddsFormat=decimal'),
        loadESPNTeams(leagueKey)
      ]);
      var oddsRes   = responses[0];
      var remaining = oddsRes.headers.get('x-requests-remaining');
      var used      = oddsRes.headers.get('x-requests-used');
      if (remaining !== null) quotaInfo.textContent = 'Créditos usados: ' + used + ' | Restantes: ' + remaining;
      var data = [];
      if (oddsRes.ok) { data = await oddsRes.json(); if (!Array.isArray(data)) data = []; }
      if (staticTeams.length === 0 && data.length === 0) { showError('No hay partidos disponibles para esta liga.'); setLoading(false); return; }
      eventsCache = data;
      populateTeams(data, staticTeams);
      if (eventsCache.length > 0) scanBtn.disabled = false;
    } catch (e) { showError('Error al conectar: ' + e.message); }
    setLoading(false);
  });

  function checkTeams() {
    hideError();
    var a = teamA.value, b = teamB.value;
    predictBtn.disabled = !(a && b && a !== b);
    if (a && b && a === b) showError('Debes elegir dos equipos distintos.');
  }
  teamA.addEventListener('change', checkTeams);
  teamB.addEventListener('change', checkTeams);

  // ── PREDICT BUTTON ───────────────────────────────────
  predictBtn.addEventListener('click', async function () {
    hideError();
    resultDiv.style.display = 'none'; combinedDiv.style.display = 'none'; espnPanel.style.display = 'none';
    var tA = teamA.value, tB = teamB.value;
    if (!tA || !tB || tA === tB) { showError('Selecciona dos equipos distintos.'); return; }
    var rel    = eventsCache.filter(function (e) { return (e.home_team===tA&&e.away_team===tB)||(e.home_team===tB&&e.away_team===tA); });
    var direct = rel.length > 0;
    if (!direct) rel = eventsCache.filter(function (e) { return e.home_team===tA||e.away_team===tA||e.home_team===tB||e.away_team===tB; });
    var probA = 0.5, probB = 0.5;
    if (rel.length > 0) {
      var pAr = getAvgProb(rel, tA), pBr = getAvgProb(rel, tB);
      if (pAr !== null && pBr !== null) {
        var tot = pAr + pBr; probA = pAr / tot; probB = pBr / tot;
        var bks = new Set(); rel.forEach(function (e) { e.bookmakers.forEach(function (b) { bks.add(b.key); }); });
        document.getElementById('winnerName').textContent     = '🏆 ' + (probA >= probB ? tA : tB);
        document.getElementById('bookmakerCount').textContent = 'Basado en ' + bks.size + ' casas · ' + (direct ? 'Partido directo' : 'Rendimiento individual');
        document.getElementById('nameA').textContent = tA; document.getElementById('pctA').textContent = Math.round(probA * 100) + '%';
        document.getElementById('nameB').textContent = tB; document.getElementById('pctB').textContent = Math.round(probB * 100) + '%';
        document.getElementById('boxA').className    = 'prob-box' + (probA >= probB ? ' highlight' : '');
        document.getElementById('boxB').className    = 'prob-box' + (probB > probA  ? ' highlight' : '');
        document.getElementById('barFill').style.width = Math.round(probA * 100) + '%';
        resultDiv.style.display = 'block';
      }
    } else { showError('No hay odds activas para estos equipos.'); }
    var leagueKey = leagueSelect.value;
    espnPanel.style.display = 'flex';
    espnGrid.innerHTML = '<div class="espn-loader">⏳ Cargando datos ESPN...</div>';
    var espnResults = await Promise.all([fetchESPNTeamData(leagueKey, tA), fetchESPNTeamData(leagueKey, tB)]);
    espnGrid.innerHTML = renderTeamCard(espnResults[0], tA) + renderTeamCard(espnResults[1], tB);
    if (resultDiv.style.display === 'block') renderCombinedScore(tA, tB, probA, probB, espnResults[0], espnResults[1]);
  });

  // ── DAILY SCANNER ────────────────────────────────────
  function renderScannerResults() {
    var filtered = scanResults.filter(function (r) { return r.ev >= evMinActive; });
    var existing = scannerPanel.querySelectorAll('.scanner-card');
    existing.forEach(function (c) { c.remove(); });
    var header = scannerPanel.querySelector('.scanner-header');

    if (filtered.length === 0) {
      if (!header) {
        var empty = document.createElement('div');
        empty.className = 'scanner-header';
        empty.style.cssText = 'color:#555;font-size:0.85rem;text-align:center;padding:16px';
        empty.innerHTML = '❌ No hay partidos con EV ≥ ' + Math.round(evMinActive * 100) + '% en este filtro.';
        scannerPanel.appendChild(empty);
      } else {
        header.innerHTML = '❌ No hay partidos con EV ≥ ' + Math.round(evMinActive * 100) + '% en este filtro.';
      }
      return;
    }

    if (header) header.innerHTML = '✅ ' + filtered.length + ' partido(s) con valor encontrados hoy';

    filtered.forEach(function (r) {
      var evColor = r.ev >= 0.10 ? '#2cb67d' : r.ev >= 0.05 ? '#ffd700' : '#ff6b6b';
      var evLabel = r.ev >= 0.10 ? '🟢 EV alto' : r.ev >= 0.05 ? '🟡 EV moderado' : '🔴 EV bajo';
      var card = document.createElement('div');
      card.className = 'scanner-card';
      card.style.cssText = 'border:1px solid ' + evColor + '44;';
      card.dataset.ev = r.ev;
      card.innerHTML =
        '<div style="font-size:0.72rem;color:#555;margin-bottom:4px">⏰ ' + r.time + ' · ' + r.home + ' vs ' + r.away + '</div>' +
        '<div style="font-size:1.05rem;font-weight:700;color:' + evColor + ';margin-bottom:10px">✅ APOSTAR: ' + r.betTeam + '</div>' +
        '<div class="scanner-stats">' +
          '<div class="scanner-stat"><div class="scanner-stat-label">Modelo</div><div class="scanner-stat-value" style="color:#e0e0f0">' + r.modelPct + '%</div></div>' +
          '<div class="scanner-stat"><div class="scanner-stat-label">Casa dice</div><div class="scanner-stat-value" style="color:#aaa">' + r.mktPct + '%</div></div>' +
          '<div class="scanner-stat"><div class="scanner-stat-label">Mejor odd</div><div class="scanner-stat-value" style="color:#ffd700">' + r.odd + '</div></div>' +
          '<div class="scanner-stat"><div class="scanner-stat-label">Edge</div><div class="scanner-stat-value" style="color:' + evColor + '">+' + Math.round(r.edge * 100) + '%</div></div>' +
        '</div>' +
        '<div style="margin-top:8px;font-size:0.78rem;color:' + evColor + '">' + evLabel + ' · EV: ' + (r.ev > 0 ? '+' : '') + (r.ev * 100).toFixed(1) + '¢ por $1 apostado</div>';
      scannerPanel.appendChild(card);
    });
  }

  scanBtn.addEventListener('click', async function () {
    if (eventsCache.length === 0) return;
    scanBtn.disabled = true;
    scanBtn.textContent = '⏳ Escaneando ' + eventsCache.length + ' partidos...';
    scannerPanel.style.display = 'flex';
    scannerPanel.innerHTML = '<div style="color:#555;font-size:0.85rem;text-align:center;padding:8px">Analizando partidos...</div>';
    scanResults = [];
    var leagueKey = leagueSelect.value;

    for (var i = 0; i < eventsCache.length; i++) {
      var ev = eventsCache[i];
      var tA = ev.home_team, tB = ev.away_team;
      var pAr = getAvgProb([ev], tA);
      var pBr = getAvgProb([ev], tB);
      if (!pAr || !pBr) continue;
      var tot  = pAr + pBr;
      var mktA = pAr / tot, mktB = pBr / tot;
      var dataA = await fetchESPNTeamData(leagueKey, tA);
      var dataB = await fetchESPNTeamData(leagueKey, tB);
      var fsA   = dataA && dataA.formScore !== null ? dataA.formScore : 0.5;
      var fsB   = dataB && dataB.formScore !== null ? dataB.formScore : 0.5;
      var combA = (mktA * 0.6) + (fsA * 0.4);
      var combB = (mktB * 0.6) + (fsB * 0.4);
      var totalComb = combA + combB;
      var modelA = combA / totalComb;
      var modelB = combB / totalComb;
      var edgeA  = modelA - mktA;
      var edgeB  = modelB - mktB;
      if (Math.max(Math.abs(edgeA), Math.abs(edgeB)) < 0.05) continue;
      var betTeam  = edgeA >= edgeB ? tA : tB;
      var betEdge  = edgeA >= edgeB ? edgeA : edgeB;
      var betModel = edgeA >= edgeB ? modelA : modelB;
      var betMkt   = edgeA >= edgeB ? mktA : mktB;
      var bestOdd  = getBestOdd(ev, betTeam);
      var ev_val   = (betModel * (bestOdd - 1)) - (1 - betModel);
      scanResults.push({
        home: tA, away: tB,
        betTeam: betTeam,
        edge:     betEdge,
        ev:       ev_val,
        modelPct: Math.round(betModel * 100),
        mktPct:   Math.round(betMkt * 100),
        odd:      bestOdd.toFixed(2),
        time:     formatGameTime(ev.commence_time)
      });
    }

    scanResults.sort(function (a, b) { return b.ev - a.ev; });
    scannerPanel.innerHTML = '';
    var headerDiv = document.createElement('div');
    headerDiv.className = 'scanner-header';
    headerDiv.style.cssText = 'font-size:0.75rem;color:#f7971e;text-transform:uppercase;letter-spacing:0.08em;padding:4px 0';
    headerDiv.textContent = '✅ ' + scanResults.length + ' partido(s) con valor encontrados hoy';
    scannerPanel.appendChild(headerDiv);
    evFilterRow.style.display = 'flex';
    renderScannerResults();
    scanBtn.disabled = false;
    scanBtn.textContent = '🔍 Escanear todos los partidos de hoy';
  });

  // ── EV FILTER BUTTONS ────────────────────────────────
  document.querySelectorAll('.ev-filter').forEach(function (btn) {
    btn.addEventListener('click', function () {
      evMinActive = parseFloat(this.dataset.min);
      document.querySelectorAll('.ev-filter').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      renderScannerResults();
    });
  });

});
