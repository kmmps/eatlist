// eatlist — App root, BottomNav, navigation
const { useState, useEffect, useRef } = React;

// ── BottomNav ─────────────────────────────────────────────────────
const BottomNav = ({ activeTab, onTab, dark }) => {
  const c = getC(dark);
  const tabs = [
    { id: 'home',    label: 'Início',   Icon: HomeIc  },
    { id: 'search',  label: 'Buscar',   Icon: SearchIc },
    { id: 'map',     label: 'Mapa',     Icon: MapIc   },
    { id: 'profile', label: 'Perfil',   Icon: UserIc  },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 82,
      background: c.bg, borderTop: `1px solid ${c.border}`,
      display: 'flex', alignItems: 'flex-start', paddingTop: 10,
      zIndex: 800,
    }}>
      {tabs.map(({ id, label, Icon }) => {
        const active = activeTab === id;
        return (
          <button key={id} onClick={() => onTab(id)}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>
            <div style={{ width: 40, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 100, background: active ? `${CORAL}15` : 'transparent', transition: 'background 0.15s' }}>
              <Icon s={24} col={active ? CORAL : GRAY}/>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: active ? 700 : 400, color: active ? CORAL : GRAY, letterSpacing: '-0.02em' }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

// ── Screen transition wrapper ─────────────────────────────────────
const ScreenSlide = ({ visible, children }) => {
  const [show,   setShow]   = useState(visible);
  const [anim,   setAnim]   = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      return () => cancelAnimationFrame(raf);
    } else {
      setAnim(false);
      const t = setTimeout(() => setShow(false), 280);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!show) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: anim ? 1 : 0,
      transform: anim ? 'translateX(0)' : 'translateX(22px)',
      transition: 'opacity 0.26s ease, transform 0.26s ease',
      zIndex: anim ? 10 : 5,
    }}>
      {children}
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────
const App = () => {
  const [screen,     setScreen]     = useState('splash');
  const [history,    setHistory]    = useState([]);
  const [dark] = useState(false);
  const [activeTab,  setActiveTab]  = useState('home');
  const [listId,     setListId]     = useState(null);
  const [restaurantId, setRId]      = useState(null);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  // Tweakable defaults
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "showFriendActivity": true,
    "city": "São Paulo",
    "visibleCategories": "Todos"
  }/*EDITMODE-END*/;

  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);

  const setTweak = (key, val) => {
    const next = typeof key === 'object' ? { ...tweaks, ...key } : { ...tweaks, [key]: val };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: next }, '*');
  };

  // Tweaks panel host protocol
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode')   setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  // Build lists from DATA filtered by tweaks
  const allLists = window.DATA.lists;

  const go = (dest, params = {}) => {
    setHistory(h => [...h, { screen, listId, restaurantId }]);
    if (params.listId !== undefined)       setListId(params.listId);
    if (params.restaurantId !== undefined) setRId(params.restaurantId);
    if (['home','search','map','profile'].includes(dest)) setActiveTab(dest);
    setScreen(dest);
  };

  const back = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setListId(prev.listId);
    setRId(prev.restaurantId);
    setScreen(prev.screen);
    if (['home','search','map','profile'].includes(prev.screen)) setActiveTab(prev.screen);
  };

  const onTab = (tab) => {
    setHistory([]);
    setActiveTab(tab);
    setScreen(tab);
  };

  const showNav = !['splash','login'].includes(screen);
  const props = { dark, go, back, allLists, showFriendActivity: tweaks.showFriendActivity };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>


      {/* Screens */}
      {screen === 'splash' && <SplashScreen onDone={() => { setScreen('login'); }}/>}
      {screen === 'login'  && <LoginScreen  onLogin={() => go('home')} onRegister={() => go('home')}/>}

      {showNav && (
        <>
          <ScreenSlide visible={screen === 'home'}>
            <HomeScreen   {...props}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'search'}>
            <SearchScreen {...props}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'map'}>
            <MapScreen    {...props}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'profile'}>
            <ProfileScreen {...props}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'lists'}>
            <ListsGridScreen {...props}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'new-list'}>
            <NewListScreen {...props}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'list-open'}>
            <ListOpenScreen {...props} listId={listId}/>
          </ScreenSlide>
          <ScreenSlide visible={screen === 'restaurant'}>
            <RestaurantScreen {...props} restaurantId={restaurantId}/>
          </ScreenSlide>

          <BottomNav activeTab={activeTab} onTab={onTab} dark={dark}/>
        </>
      )}

      {/* Tweaks Panel */}
      {tweaksOpen && (
        <TweaksPanel onClose={() => { setTweaksOpen(false); window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); }}>
          <TweakSection title="Feed">
            <TweakToggle label="Atividade dos amigos" value={tweaks.showFriendActivity} onChange={v => setTweak('showFriendActivity', v)}/>
          </TweakSection>
          <TweakSection title="Cidade">
            <TweakSelect label="Localização" value={tweaks.city} options={['São Paulo','Rio de Janeiro','Belo Horizonte','Curitiba']} onChange={v => setTweak('city', v)}/>
          </TweakSection>
          <TweakSection title="Filtro de categorias">
            <TweakRadio label="Mostrar" value={tweaks.visibleCategories} options={['Todos','Padaria','Pizza','Japonês']} onChange={v => setTweak('visibleCategories', v)}/>
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
