// eatlist — Screens: Splash, Login, Home, Search
const { useState, useEffect, useRef } = React;

// ── SplashScreen ──────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  const [fade, setFade] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1400);
    const t2 = setTimeout(() => onDone(), 1800);
    return () => {clearTimeout(t1);clearTimeout(t2);};
  }, []);
  return (
    <div onClick={onDone} style={{ position: 'absolute', inset: 0, background: CORAL, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, opacity: fade ? 0 : 1, transition: 'opacity 0.4s ease', cursor: 'pointer' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <EatLogo color="white" height={42} />
        <ListLogo color="white" height={32} />
      </div>
      <div style={{ position: 'absolute', bottom: 48 }}>
        <div style={{ width: 48, height: 4, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }} />
      </div>
    </div>);

};

// ── LoginScreen ───────────────────────────────────────────────────
const LoginScreen = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  return (
    <div style={{ position: 'absolute', inset: 0, background: DARK, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top: logo area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <EatLogo color="white" height={40} />
          <ListLogo color="white" height={30} />
        </div>
        <div style={{ marginTop: 16, ...ts(14), color: 'rgba(255,255,255,0.45)', letterSpacing: '-0.02em' }}>playlists de restaurantes</div>
      </div>

      {/* Bottom: white sheet */}
      <div style={{ background: '#fff', borderRadius: '32px 32px 0 0', padding: '28px 24px 40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Tab switcher */}
        <div style={{ display: 'flex', background: LGRAY, borderRadius: 100, padding: 4, gap: 4 }}>
          {['login', 'register'].map((t) =>
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, height: 34, borderRadius: 100, border: 'none', cursor: 'pointer', background: tab === t ? '#fff' : 'transparent', boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.12)' : 'none', ...ts(14, 600), color: tab === t ? DARK : GRAY, transition: 'all 0.2s' }}>
              {t === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tab === 'register' &&
          <input placeholder="Seu nome" style={{ width: '100%', height: 44, background: LGRAY, border: 'none', borderRadius: 12, padding: '0 14px', ...ts(15), outline: 'none', caretColor: CORAL }} />
          }
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email"
          style={{ width: '100%', height: 44, background: LGRAY, border: 'none', borderRadius: 12, padding: '0 14px', ...ts(15), outline: 'none', caretColor: CORAL }} />
          <div style={{ position: 'relative' }}>
            <input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Senha" type={showPass ? 'text' : 'password'}
            style={{ width: '100%', height: 44, background: LGRAY, border: 'none', borderRadius: 12, padding: '0 44px 0 14px', ...ts(15), outline: 'none', caretColor: CORAL }} />
            <button onClick={() => setShowPass((v) => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
              <EyeIc s={18} col={GRAY} />
            </button>
          </div>
          {tab === 'login' &&
          <div style={{ textAlign: 'right' }}>
              <span style={{ ...ts(13), color: CORAL, cursor: 'pointer' }}>Esqueci a senha</span>
            </div>
          }
        </div>

        <button onClick={onLogin} style={{ width: '100%', height: 48, background: CORAL, border: 'none', borderRadius: 14, cursor: 'pointer', ...ts(16, 700), color: 'white' }}>
          {tab === 'login' ? 'Entrar' : 'Criar conta'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: '#EEEEEE' }} />
          <span style={{ ...ts(13), color: GRAY }}>ou continue com</span>
          <div style={{ flex: 1, height: 1, background: '#EEEEEE' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
          { icon: <GoogleIc s={20} />, label: 'Continuar com Google' },
          { icon: <InstagramIc s={20} />, label: 'Continuar com Instagram' }].
          map(({ icon, label }) =>
          <button key={label} onClick={onLogin} style={{ width: '100%', height: 50, background: LGRAY, border: 'none', borderRadius: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, ...ts(15, 500), color: DARK }}>
              {icon}{label}
            </button>
          )}
        </div>
      </div>
    </div>);

};

// ── HomeScreen ────────────────────────────────────────────────────
const HomeScreen = ({ dark, go, allLists, showFriendActivity }) => {
  const c = getC(dark);
  const allRestaurants = allLists.flatMap((l) => l.restaurants);

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar dark={dark} />
      <AppHeader dark={dark} onListsOpen={() => go('new-list')} onProfile={() => go('profile')} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px 0' }}>
        {/* Search */}
        <div style={{ marginBottom: 24 }}>
          <SearchInput dark={dark} onFocus={() => go('search')} placeholder="Buscar restaurantes, listas..." />
        </div>

        {/* Mapa section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ ...ts(16, 500), color: c.text }}>Explorar
</span>
            <button onClick={() => go('map')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
              <ArrowRightIc s={20} col={GRAY} />
            </button>
          </div>
          <div style={{ height: 220, borderRadius: 24, overflow: 'hidden', position: 'relative', cursor: 'pointer' }} onClick={() => go('map')}>
            <MiniMap dark={dark} markers={allRestaurants} onClick={() => go('map')} />
            {/* Location chip */}
            <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: c.bg, borderRadius: 100, padding: '7px 16px 7px 10px', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 1px 6px rgba(0,0,0,0.15)', zIndex: 500 }}>
              <DirectionIc s={14} col={CORAL} />
              <span style={{ ...ts(13, 700), color: c.text, fontWeight: "400" }}>Pinheiros, SP</span>
              <ChevronDownIc s={12} col={GRAY} />
            </div>
            {/* List button overlay */}
            <button onClick={(e) => {e.stopPropagation();go('lists');}} style={{ position: 'absolute', bottom: 12, right: 12, background: DARK, border: 'none', borderRadius: 100, padding: '7px 14px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', zIndex: 500 }}>
              <ListIc s={13} col="white" />
              <span style={{ ...ts(13, 700), color: 'white' }}>Ver listas</span>
            </button>
          </div>
        </div>

        {/* Listas sugeridas */}
        {/* Feed de amigos */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ ...ts(16, 500), color: c.text }}>Seus amigos</span>
          </div>
          {window.DATA.feedItems.map((item, idx) => {
            const list = allLists.find((l) => l.id === item.listId);
            if (!list) return null;
            return (
              <FeedCard key={idx} item={item} list={list} dark={dark} go={go} isLast={idx === window.DATA.feedItems.length - 1} />);

          })}
        </div>

        {/* Listas sugeridas */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ ...ts(16, 500), color: c.text }}>Listas sugeridas</span>
            <button onClick={() => go('lists')} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 4 }}>
              <ArrowRightIc s={20} col={GRAY} />
            </button>
          </div>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none' }}>
            {allLists.map((list) => <ListCard key={list.id} list={list} dark={dark} onClick={() => go('list-open', { listId: list.id })} />)}
          </div>
        </div>

        <div style={{ height: 100 }} />
      </div>
    </div>);

};

// ── SearchScreen ──────────────────────────────────────────────────
const SearchScreen = ({ dark, go, back, allLists }) => {
  const c = getC(dark);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');
  const filters = ['Todos', 'Restaurantes', 'Listas', 'Pessoas'];

  const allRestaurants = allLists.flatMap((l) => l.restaurants);

  const matchR = allRestaurants.filter((r) =>
  !query || r.name.toLowerCase().includes(query.toLowerCase()) ||
  r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );
  const matchL = allLists.filter((l) =>
  !query || l.title.toLowerCase().includes(query.toLowerCase())
  );
  const matchF = window.DATA.friends.filter((f) =>
  !query || f.name.toLowerCase().includes(query.toLowerCase())
  );

  const showR = filter === 'Todos' || filter === 'Restaurantes';
  const showL = filter === 'Todos' || filter === 'Listas';
  const showP = filter === 'Todos' || filter === 'Pessoas';

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={dark} />
      <AppHeader dark={dark} onListsOpen={() => go('lists')} onProfile={() => go('profile')} />

      <div style={{ padding: '12px 22px 0' }}>
        <SearchInput dark={dark} value={query} onChange={setQuery} autoFocus placeholder="Buscar restaurantes, listas..." />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 22px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
        {filters.map((f) =>
        <Pill key={f} label={f} active={filter === f} dark={dark} onClick={() => setFilter(f)} />
        )}
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px' }}>
        {showR && matchR.length > 0 &&
        <div style={{ marginBottom: 24 }}>
            <div style={{ ...ts(16), color: GRAY, marginBottom: 10 }}>Locais</div>
            {matchR.slice(0, 5).map((r) =>
          <div key={r.id} onClick={() => go('restaurant', { restaurantId: r.id })}
          style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${c.border}`, cursor: 'pointer' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: CORAL + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PinIc s={18} col={CORAL} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ ...ts(16, 500), color: c.text }}>{r.name}</div>
                  <div style={{ ...ts(13), color: GRAY }}>{r.address}</div>
                </div>
                <ArrowRightIc s={16} col={GRAY} />
              </div>
          )}
          </div>
        }

        {showL && matchL.length > 0 &&
        <div style={{ marginBottom: 24 }}>
            <div style={{ ...ts(16), color: GRAY, marginBottom: 10 }}>Está nas listas</div>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {matchL.slice(0, 4).map((l) =>
            <div key={l.id} onClick={() => go('list-open', { listId: l.id })}
            style={{ flexShrink: 0, width: 148, background: c.surf, borderRadius: 14, padding: '14px 12px 12px', cursor: 'pointer', position: 'relative' }}>
                  <div style={{ ...ts(18, 500), color: c.text, marginBottom: 4, lineHeight: 1.1 }}>{l.title}</div>
                  <div style={{ ...ts(12), color: GRAY }}>{l.author}</div>
                  <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                    <ArrowRightIc s={18} col={GRAY} />
                  </div>
                </div>
            )}
            </div>
          </div>
        }

        {showP && matchF.length > 0 &&
        <div style={{ marginBottom: 24 }}>
            <div style={{ ...ts(16), color: GRAY, marginBottom: 10 }}>Seus amigos</div>
            {matchF.map((f) => <FriendRow key={f.id} friend={f} dark={dark} />)}
          </div>
        }

        {!matchR.length && !matchL.length && !matchF.length && query &&
        <div style={{ textAlign: 'center', padding: '48px 0', ...ts(15), color: GRAY }}>
            Nenhum resultado para "{query}"
          </div>
        }

        {!query &&
        <div style={{ padding: '16px 0' }}>
            <div style={{ ...ts(14), color: GRAY, marginBottom: 14 }}>Buscas recentes</div>
            {['Fabrique Pães', 'Padarias SP', 'Lamen'].map((q) =>
          <div key={q} onClick={() => setQuery(q)} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${c.border}`, cursor: 'pointer' }}>
                <SearchIc s={16} col={GRAY} />
                <span style={{ ...ts(15), color: c.textMed }}>{q}</span>
              </div>
          )}
          </div>
        }
        <div style={{ height: 100 }} />
      </div>
    </div>);

};

// ── NewListScreen ─────────────────────────────────────────────────
const NewListScreen = ({ dark, go, back }) => {
  const c = getC(dark);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [title,    setTitle]    = useState('');
  const [desc,     setDesc]     = useState('');
  const [privacy,  setPrivacy]  = useState('pública');
  const [created,  setCreated]  = useState(false);

  const canCreate = title.trim().length > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    setCreated(true);
    setTimeout(() => go('home'), 1200);
  };

  if (created) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: CORAL, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        {coverPhoto && <img src={coverPhoto} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, background: coverPhoto ? 'rgba(0,0,0,0.45)' : 'transparent', borderRadius: 24, padding: '32px 40px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ ...ts(22, 700), color: 'white' }}>Lista criada!</div>
        <div style={{ ...ts(15), color: 'rgba(255,255,255,0.7)' }}>{title}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bg, display: 'flex', flexDirection: 'column' }}>
      <StatusBar dark={dark}/>
      <NavHeader dark={dark} onBack={back} title="Nova lista" right={
        <button onClick={handleCreate} disabled={!canCreate}
          style={{ border: 'none', background: 'none', cursor: canCreate ? 'pointer' : 'default', padding: 4 }}>
          <span style={{ ...ts(15, 700), color: canCreate ? CORAL : GRAY }}>Criar</span>
        </button>
      }/>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 22px' }}>
        {/* Cover preview / photo upload */}
        <div style={{ marginTop: 16, marginBottom: 20, position: 'relative' }}>
          <div onClick={() => {}}
            style={{ height: 140, borderRadius: 20, background: coverPhoto ? 'transparent' : '#F4F4F4', marginBottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
            {coverPhoto
              ? <img src={coverPhoto} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              : title
                ? <div style={{ position: 'absolute', inset: 0, background: CORAL, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ ...ts(26, 700), color: 'white', padding: '0 24px', textAlign: 'center', lineHeight: 1.1 }}>{title}</span>
                  </div>
                : null
            }
            {/* Upload overlay */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: coverPhoto ? 'rgba(0,0,0,0.35)' : (!title ? 'transparent' : 'rgba(0,0,0,0.2)') }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CameraIc s={20} col={DARK}/>
              </div>
              <span style={{ ...ts(13, 600), color: coverPhoto || title ? 'white' : GRAY }}>Adicionar foto</span>
            </div>
          </div>
        </div>

        {/* Nome */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ ...ts(13, 600), color: GRAY, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nome da lista</div>
          <input
            value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Padarias do centro..."
            style={{ width: '100%', height: 48, background: c.surf, border: 'none', borderRadius: 14, padding: '0 16px', ...ts(16), color: c.text, outline: 'none', caretColor: CORAL }}
          />
        </div>

        {/* Descrição */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ ...ts(13, 600), color: GRAY, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Descrição <span style={{ fontWeight: 400, textTransform: 'none' }}>(opcional)</span></div>
          <textarea
            value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Conte o que tem nessa lista..."
            rows={3}
            style={{ width: '100%', background: c.surf, border: 'none', borderRadius: 14, padding: '12px 16px', ...ts(15), color: c.text, outline: 'none', caretColor: CORAL, resize: 'none', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}
          />
        </div>

        {/* Privacidade */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ ...ts(13, 600), color: GRAY, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Privacidade</div>
          <div style={{ display: 'flex', background: c.surf, borderRadius: 14, padding: 4, gap: 4 }}>
            {['pública', 'privada'].map(opt => (
              <button key={opt} onClick={() => setPrivacy(opt)}
                style={{ flex: 1, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: privacy === opt ? c.bg : 'transparent', boxShadow: privacy === opt ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', ...ts(14, 600), color: privacy === opt ? c.text : GRAY, textTransform: 'capitalize', transition: 'all 0.15s' }}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={handleCreate} disabled={!canCreate}
          style={{ width: '100%', height: 50, borderRadius: 16, border: 'none', cursor: canCreate ? 'pointer' : 'not-allowed', background: canCreate ? CORAL : c.surf, ...ts(16, 700), color: canCreate ? 'white' : GRAY, transition: 'all 0.15s', marginBottom: 32 }}>
          Criar lista
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { SplashScreen, LoginScreen, HomeScreen, SearchScreen, NewListScreen });