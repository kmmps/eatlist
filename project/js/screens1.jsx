// eatlist — Screens: Splash, Login, Home, Search, NewList
const { useState, useEffect, useRef } = React;

// ── SplashScreen ──────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1400);
    const t2 = setTimeout(() => onDone(), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <div onClick={onDone} style={{ position: 'absolute', inset: 0, background: INK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, opacity: fade ? 0 : 1, transition: `opacity var(--duration-slow, 400ms)`, cursor: 'pointer' }}>
      <AppLogomark color={SURFACE} size={56}/>
      <span style={{ fontFamily: "var(--font-ui)", fontSize: 22, fontWeight: 600, color: SURFACE, letterSpacing: '-0.02em' }}>eatlist</span>
      <div style={{ position: 'absolute', bottom: 48 }}>
        <div style={{ width: 36, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}/>
      </div>
    </div>
  );
};

// ── LoginScreen ───────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass]   = useState('');
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState('login');

  const inputStyle = {
    width: '100%', height: 48,
    background: SURFACE,
    border: `1px solid ${BORDER}`,
    borderRadius: 'var(--radius-sm, 4px)',
    padding: '0 var(--space-3, 12px)',
    fontFamily: "var(--font-ui)",
    fontSize: 'var(--text-base, 15px)',
    color: INK,
    outline: 'none',
    caretColor: COBALT,
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "var(--font-ui)",
    fontSize: 'var(--text-sm, 13px)',
    fontWeight: 600,
    color: INK,
    marginBottom: 8,
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: INK, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top: logo */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, paddingBottom: 8 }}>
        <AppLogomark color={SURFACE} size={52}/>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 24, fontWeight: 600, color: SURFACE, letterSpacing: '-0.02em' }}>eatlist</span>
        <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: 'rgba(255,255,255,0.45)', marginTop: -4 }}>playlists de restaurantes</span>
      </div>

      {/* Bottom sheet */}
      <div style={{ background: CREAM, borderRadius: 'var(--radius-lg, 12px) var(--radius-lg, 12px) 0 0', padding: 'var(--space-6, 24px) var(--space-4, 16px) 40px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4, 16px)' }}>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: SURFACE_MUTED, borderRadius: 'var(--radius-md, 8px)', padding: 3, gap: 3 }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex: 1, height: 36, borderRadius: 6, border: 'none', cursor: 'pointer', background: tab === t ? SURFACE : 'transparent', boxShadow: tab === t ? '0 1px 3px rgba(5,6,21,0.1)' : 'none', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: tab === t ? 600 : 400, color: tab === t ? INK : SEC_TEXT, transition: `all var(--duration-fast, 150ms)` }}>
              {t === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4, 16px)' }}>
          {tab === 'register' && (
            <div className="el-form-group">
              <label style={labelStyle}>Seu nome</label>
              <input placeholder="Como você quer ser chamado" style={inputStyle}/>
            </div>
          )}
          <div>
            <label style={labelStyle} htmlFor="login-email">E-mail</label>
            <input id="login-email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" type="email" style={inputStyle}/>
          </div>
          <div>
            <label style={labelStyle} htmlFor="login-pass">Senha</label>
            <div style={{ position: 'relative' }}>
              <input id="login-pass" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" type={showPass ? 'text' : 'password'}
                style={{ ...inputStyle, paddingRight: 48 }}/>
              <button onClick={() => setShowPass(v => !v)} aria-label={showPass ? 'Ocultar senha' : 'Mostrar senha'}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', padding: 4, color: SEC_TEXT, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28 }}>
                <EyeIc s={18} col={SEC_TEXT}/>
              </button>
            </div>
            {tab === 'login' && (
              <div style={{ textAlign: 'right', marginTop: 8 }}>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: COBALT, cursor: 'pointer' }}>Esqueci a senha</span>
              </div>
            )}
          </div>
        </div>

        <button onClick={onLogin}
          style={{ width: '100%', height: 48, background: INK, border: 'none', borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SURFACE }}>
          {tab === 'login' ? 'Entrar' : 'Criar conta'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1, background: BORDER }}/>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>ou continue com</span>
          <div style={{ flex: 1, height: 1, background: BORDER }}/>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {[{ icon: <GoogleIc s={20}/>, label: 'Google' }, { icon: <InstagramIc s={20}/>, label: 'Instagram' }].map(({ icon, label }) => (
            <button key={label} onClick={onLogin}
              style={{ flex: 1, height: 48, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 500, color: INK }}>
              {icon}{label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── HomeScreen ────────────────────────────────────────────────────
const HomeScreen = ({ go, allLists, showFriendActivity }) => {
  const allRestaurants = allLists.flatMap(l => l.restaurants);

  return (
    <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar/>
      <AppHeader onListsOpen={() => go('new-list')} onProfile={() => go('profile')}/>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px var(--space-page-margin, 16px) 0' }}>

        {/* Search */}
        <div style={{ marginBottom: 'var(--space-6, 24px)' }}>
          <SearchInput onFocus={() => go('search')} placeholder="Buscar restaurantes, listas..."/>
        </div>

        {/* Mapa */}
        <div style={{ marginBottom: 'var(--space-6, 24px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3, 12px)' }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SEC_TEXT, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mapa</span>
            <button onClick={() => go('map')} aria-label="Ver mapa completo" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRightIc s={20} col={SEC_TEXT}/>
            </button>
          </div>
          <div style={{ height: 200, borderRadius: 'var(--radius-xl, 16px)', overflow: 'hidden', position: 'relative', cursor: 'pointer', border: `1px solid ${BORDER}` }} onClick={() => go('map')}>
            <MiniMap markers={allRestaurants} onClick={() => go('map')}/>
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: SURFACE, borderRadius: 'var(--radius-pill, 9999px)', padding: '7px 14px 7px 10px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 1px 6px rgba(5,6,21,0.15)', zIndex: 500 }}>
              <DirectionIc s={14} col={COBALT}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: INK }}>Pinheiros, SP</span>
              <ChevronDownIc s={12} col={SEC_TEXT}/>
            </div>
            <button onClick={e => { e.stopPropagation(); go('map'); }}
              style={{ position: 'absolute', bottom: 12, right: 12, background: INK, border: 'none', borderRadius: 'var(--radius-pill, 9999px)', padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', zIndex: 500 }}>
              <ListIc s={13} col={SURFACE}/>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: SURFACE }}>Ver no mapa</span>
            </button>
          </div>
        </div>

        {/* Feed de amigos */}
        {showFriendActivity && (
          <div style={{ marginBottom: 'var(--space-8, 32px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4, 16px)' }}>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SEC_TEXT, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Seus amigos</span>
            </div>
            {window.DATA.feedItems.map((item, idx) => {
              const list = allLists.find(l => l.id === item.listId);
              if (!list) return null;
              return <FeedCard key={idx} item={item} list={list} go={go} isLast={idx === window.DATA.feedItems.length - 1}/>;
            })}
          </div>
        )}

        {/* Listas sugeridas */}
        <div style={{ marginBottom: 'var(--space-6, 24px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4, 16px)' }}>
            <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: SEC_TEXT, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Listas sugeridas</span>
            <button onClick={() => go('lists')} aria-label="Ver todas as listas" style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowRightIc s={20} col={SEC_TEXT}/>
            </button>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
            {allLists.map(list => <ListCard key={list.id} list={list} onClick={() => go('list-open', { listId: list.id })}/>)}
          </div>
        </div>

        <div style={{ height: 100 }}/>
      </div>
    </div>
  );
};

// ── SearchScreen ──────────────────────────────────────────────────
const SearchScreen = ({ go, allLists }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const filters = ['Todos', 'Restaurantes', 'Listas', 'Pessoas'];

  const allRestaurants = allLists.flatMap(l => l.restaurants);
  const matchR = allRestaurants.filter(r => !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(query.toLowerCase())));
  const matchL = allLists.filter(l => !query || l.title.toLowerCase().includes(query.toLowerCase()));
  const matchF = window.DATA.friends.filter(f => !query || f.name.toLowerCase().includes(query.toLowerCase()));

  const showR = filter === 'Todos' || filter === 'Restaurantes';
  const showL = filter === 'Todos' || filter === 'Listas';
  const showP = filter === 'Todos' || filter === 'Pessoas';

  const sectionLabel = { fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT, marginBottom: 10 };

  return (
    <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <AppHeader onListsOpen={() => go('lists')} onProfile={() => go('profile')}/>

      <div style={{ padding: '12px var(--space-page-margin, 16px) 0' }}>
        <SearchInput value={query} onChange={setQuery} autoFocus placeholder="Buscar restaurantes, listas..."/>
      </div>

      {query.length > 0 && (
        <div style={{ display: 'flex', gap: 8, padding: '12px var(--space-page-margin, 16px)', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
          {filters.map(f => <Pill key={f} label={f} active={filter === f} onClick={() => setFilter(f)}/>)}
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--space-page-margin, 16px)' }}>

        {!query && (
          <div style={{ padding: '16px 0' }}>
            <div style={{ ...sectionLabel, marginBottom: 14 }}>Buscas recentes</div>
            {['Fabrique Pães', 'Padarias SP', 'Lamen'].map(q => (
              <div key={q} onClick={() => setQuery(q)} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
                <SearchIc s={16} col={SEC_TEXT}/>
                <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', color: INK }}>{q}</span>
              </div>
            ))}
          </div>
        )}

        {query && showR && matchR.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionLabel}>Locais</div>
            {matchR.slice(0, 5).map(r => (
              <div key={r.id} onClick={() => go('restaurant', { restaurantId: r.id })}
                style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${BORDER}`, cursor: 'pointer' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md, 8px)', background: COBALT_MUTED, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PinIc s={18} col={COBALT}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK }}>{r.name}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: SEC_TEXT }}>{r.address}</div>
                </div>
                <ArrowRightIc s={16} col={SEC_TEXT}/>
              </div>
            ))}
          </div>
        )}

        {query && showL && matchL.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionLabel}>Listas</div>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {matchL.slice(0, 4).map(l => (
                <div key={l.id} onClick={() => go('list-open', { listId: l.id })}
                  style={{ flexShrink: 0, width: 148, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-md, 8px)', padding: 'var(--space-3, 12px)', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', fontWeight: 500, color: INK, marginBottom: 4, lineHeight: 1.4 }}>{l.title}</div>
                  <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', color: SEC_TEXT }}>{l.author}</div>
                  <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                    <ArrowRightIc s={16} col={SEC_TEXT}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {query && showP && matchF.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={sectionLabel}>Pessoas</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {matchF.map(f => <FriendRow key={f.id} friend={f}/>)}
            </div>
          </div>
        )}

        {query && !matchR.length && !matchL.length && !matchF.length && (
          <div style={{ textAlign: 'center', padding: '48px 0', fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', color: SEC_TEXT }}>
            Nenhum resultado para "{query}"
          </div>
        )}

        <div style={{ height: 100 }}/>
      </div>
    </div>
  );
};

// ── NewListScreen ─────────────────────────────────────────────────
const NewListScreen = ({ go, back }) => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [title,   setTitle]   = useState('');
  const [desc,    setDesc]    = useState('');
  const [privacy, setPrivacy] = useState('pública');
  const [created, setCreated] = useState(false);

  const canCreate = title.trim().length > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    const newId = Math.max(...window.DATA.lists.map(l => l.id)) + 1;
    window.DATA.lists.push({ id: newId, title: title.trim(), author: 'Você', followers: 0, category: '', img: coverPhoto || '', restaurants: [], description: desc.trim() });
    setCreated(true);
    setTimeout(() => go('list-open', { listId: newId }), 1200);
  };

  if (created) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: INK, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        {coverPhoto && <img src={coverPhoto} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, background: coverPhoto ? 'rgba(5,6,21,0.55)' : 'transparent', borderRadius: 'var(--radius-lg, 12px)', padding: '32px 40px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: SURFACE }}>Lista criada.</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', color: 'rgba(255,255,255,0.6)' }}>{title}</div>
        </div>
      </div>
    );
  }

  const labelStyle = { display: 'block', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: INK, marginBottom: 8 };
  const inputStyle = { width: '100%', height: 48, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-sm, 4px)', padding: '0 var(--space-3, 12px)', fontFamily: "var(--font-ui)", fontSize: 'var(--text-base, 15px)', color: INK, outline: 'none', caretColor: COBALT, boxSizing: 'border-box' };

  return (
    <div style={{ position: 'absolute', inset: 0, background: CREAM, display: 'flex', flexDirection: 'column' }}>
      <StatusBar/>
      <NavHeader onBack={back} title="Nova lista" right={
        <button onClick={handleCreate} disabled={!canCreate}
          style={{ border: 'none', background: 'none', cursor: canCreate ? 'pointer' : 'default', padding: 4 }}>
          <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: canCreate ? COBALT : SEC_TEXT }}>Criar</span>
        </button>
      }/>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 var(--space-page-margin, 16px)' }}>

        {/* Cover preview */}
        <div style={{ marginTop: 16, marginBottom: 'var(--space-5, 20px)' }}>
          <div style={{ height: 140, borderRadius: 'var(--radius-md, 8px)', background: coverPhoto ? 'transparent' : SURFACE_MUTED, border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
            {coverPhoto
              ? <img src={coverPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              : title
              ? <div style={{ position: 'absolute', inset: 0, background: INK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 'var(--text-xl, 24px)', fontWeight: 300, color: SURFACE, padding: '0 24px', textAlign: 'center', lineHeight: 1.4 }}>{title}</span>
                </div>
              : null}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: coverPhoto ? 'rgba(5,6,21,0.35)' : (!title ? 'transparent' : 'rgba(5,6,21,0.2)') }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CameraIc s={20} col={INK}/>
              </div>
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 'var(--text-xs, 11px)', fontWeight: 600, color: coverPhoto || title ? SURFACE : SEC_TEXT }}>Adicionar foto</span>
            </div>
          </div>
        </div>

        {/* Nome */}
        <div style={{ marginBottom: 'var(--space-5, 20px)' }}>
          <label style={labelStyle} htmlFor="new-list-title">Nome da lista</label>
          <input id="new-list-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Padarias do centro..." style={inputStyle}/>
        </div>

        {/* Descrição */}
        <div style={{ marginBottom: 'var(--space-5, 20px)' }}>
          <label style={labelStyle} htmlFor="new-list-desc">
            Descrição <span style={{ fontWeight: 400 }}>(opcional)</span>
          </label>
          <textarea id="new-list-desc" value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Conte o que tem nessa lista..." rows={4}
            style={{ width: '100%', minHeight: 120, background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 'var(--radius-sm, 4px)', padding: 'var(--space-3, 12px)', fontFamily: "var(--font-display, 'Fraunces', Georgia, serif)", fontSize: 'var(--text-base, 15px)', color: INK, outline: 'none', caretColor: COBALT, resize: 'vertical', lineHeight: 1.6, boxSizing: 'border-box' }}/>
        </div>

        {/* Privacidade */}
        <div style={{ marginBottom: 'var(--space-8, 32px)' }}>
          <label style={{ ...labelStyle, marginBottom: 10 }}>Privacidade</label>
          <div style={{ display: 'flex', background: SURFACE_MUTED, borderRadius: 'var(--radius-md, 8px)', padding: 4, gap: 4 }}>
            {['pública', 'privada'].map(opt => (
              <button key={opt} onClick={() => setPrivacy(opt)}
                style={{ flex: 1, height: 36, borderRadius: 6, border: 'none', cursor: 'pointer', background: privacy === opt ? SURFACE : 'transparent', boxShadow: privacy === opt ? '0 1px 4px rgba(5,6,21,0.1)' : 'none', fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: privacy === opt ? INK : SEC_TEXT, textTransform: 'capitalize', transition: `all var(--duration-fast, 150ms)` }}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={handleCreate} disabled={!canCreate}
          style={{ width: '100%', height: 48, borderRadius: 'var(--radius-md, 8px)', border: 'none', cursor: canCreate ? 'pointer' : 'not-allowed', background: canCreate ? INK : SURFACE_MUTED, fontFamily: "var(--font-ui)", fontSize: 'var(--text-sm, 13px)', fontWeight: 600, color: canCreate ? SURFACE : SEC_TEXT, transition: `all var(--duration-fast, 150ms)`, marginBottom: 32, opacity: canCreate ? 1 : 0.48 }}>
          Criar lista
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { SplashScreen, LoginScreen, HomeScreen, SearchScreen, NewListScreen });
