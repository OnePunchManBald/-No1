import { useMemo, useState } from 'react'
import {
  Add,
  AutoAwesome,
  BugReportOutlined,
  CheckCircleOutline,
  ChevronRight,
  Close,
  DashboardOutlined,
  DescriptionOutlined,
  GroupsOutlined,
  Menu,
  Search,
  SettingsOutlined,
  TrendingUp,
  WarningAmberOutlined,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'

type Trouble = {
  id: number
  title: string
  category: string
  status: '解決済み' | '対応中'
  date: string
  initials: string
}

const initialTroubles: Trouble[] = [
  { id: 1, title: 'DjangoのALLOWED_HOSTSエラー', category: 'Django', status: '解決済み', date: '今日 10:42', initials: 'DK' },
  { id: 2, title: 'Git push時の認証エラー', category: 'Git', status: '解決済み', date: '昨日 16:20', initials: 'GT' },
  { id: 3, title: 'PostgreSQLに接続できない', category: 'PostgreSQL', status: '対応中', date: '8月24日', initials: 'PG' },
  { id: 4, title: 'Docker composeが起動しない', category: 'Docker', status: '解決済み', date: '8月22日', initials: 'DC' },
]

const navItems = [
  { label: 'ダッシュボード', icon: <DashboardOutlined /> },
  { label: 'トラブル一覧', icon: <DescriptionOutlined /> },
  { label: 'チームのナレッジ', icon: <GroupsOutlined /> },
]

function App() {
  const [troubles, setTroubles] = useState(initialTroubles)
  const [searchTerm, setSearchTerm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [snackbar, setSnackbar] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Python')

  const filteredTroubles = useMemo(
    () => troubles.filter((trouble) => `${trouble.title} ${trouble.category}`.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm, troubles],
  )

  const registerTrouble = () => {
    if (!newTitle.trim()) return
    setTroubles((current) => [
      { id: Date.now(), title: newTitle.trim(), category: newCategory, status: '対応中', date: 'たった今', initials: newCategory.slice(0, 2).toUpperCase() },
      ...current,
    ])
    setNewTitle('')
    setDialogOpen(false)
    setSnackbar('トラブルを登録しました')
  }

  const drawerContent = (
    <Box className="sidebar-content">
      <Box className="brand-mark"><BugReportOutlined /><Typography className="brand-name">TechSupport <span>Hub</span></Typography></Box>
      <Box className="workspace-switcher"><Avatar sx={{ bgcolor: '#dce9ff', color: '#1758b5' }}>Y</Avatar><Box><Typography className="switcher-title">Yuta のワークスペース</Typography><Typography className="switcher-subtitle">個人スペース</Typography></Box><ChevronRight className="switcher-arrow" /></Box>
      <Typography className="nav-label">WORKSPACE</Typography>
      <Box component="nav" className="nav-list">{navItems.map((item, index) => <Button key={item.label} className={`nav-item ${index === 0 ? 'active' : ''}`} startIcon={item.icon}>{item.label}</Button>)}</Box>
      <Box className="sidebar-bottom"><Button className="nav-item" startIcon={<SettingsOutlined />}>設定</Button><Box className="help-card"><Typography className="help-kicker">QUICK START</Typography><Typography className="help-title">最初のトラブルを<br />記録しましょう</Typography><Typography className="help-copy">チームの知識を育てる<br />第一歩です。</Typography><Button onClick={() => setDialogOpen(true)} endIcon={<ChevronRight />}>登録をはじめる</Button></Box><Typography className="version">TechSupport Hub v0.1</Typography></Box>
    </Box>
  )

  return (
    <Box className="app-shell">
      <Drawer variant="permanent" className="desktop-drawer" PaperProps={{ className: 'sidebar' }}>{drawerContent}</Drawer>
      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} className="mobile-drawer" PaperProps={{ className: 'sidebar' }}>{drawerContent}</Drawer>
      <Box component="main" className="main-content">
        <Box className="topbar"><IconButton className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu /></IconButton><Typography className="mobile-title">TechSupport Hub</Typography><Box className="topbar-right"><IconButton><NotificationsDot /></IconButton><Divider orientation="vertical" flexItem /><Avatar className="user-avatar">YT</Avatar><Box className="user-copy"><Typography>Yuta Tanaka</Typography><span>エンジニア</span></Box></Box></Box>
        <Box className="content-wrap">
          <Box className="page-heading"><Box><Typography className="eyebrow">MONDAY, AUGUST 26, 2026</Typography><Typography component="h1">おかえりなさい、<span>Yutaさん</span></Typography><Typography className="heading-copy">今日もひとつ、トラブルを解決していきましょう。</Typography></Box><Button className="primary-action" variant="contained" startIcon={<Add />} onClick={() => setDialogOpen(true)}>トラブルを登録</Button></Box>
          <Box className="search-panel"><Box><Typography className="search-title">何を解決しますか？</Typography><Typography className="search-subtitle">過去のトラブルや解決策を検索できます</Typography></Box><TextField className="search-input" placeholder="キーワード、エラーメッセージで検索" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }} /></Box>
          <Box className="stats-grid"><StatCard icon={<DescriptionOutlined />} label="トラブル総数" value={troubles.length} trend="先月比 +12%" color="blue" /><StatCard icon={<WarningAmberOutlined />} label="対応中" value={troubles.filter((item) => item.status === '対応中').length} trend="早めの対応を" color="orange" /><StatCard icon={<CheckCircleOutline />} label="解決済み" value={troubles.filter((item) => item.status === '解決済み').length} trend="解決率 88%" color="green" /><StatCard icon={<TrendingUp />} label="今月の解決数" value="12" trend="先月比 +20%" color="purple" /></Box>
          <Box className="section-grid"><Paper className="recent-panel"><Box className="panel-header"><Box><Typography className="section-kicker">ACTIVITY</Typography><Typography className="panel-title">最近のトラブル</Typography></Box><Button onClick={() => setSnackbar('トラブル一覧は準備中です')} endIcon={<ChevronRight />}>すべて見る</Button></Box><Box className="trouble-list">{filteredTroubles.length ? filteredTroubles.map((trouble) => <Box className="trouble-row" key={trouble.id}><Avatar className={`trouble-avatar avatar-${trouble.category.toLowerCase()}`}>{trouble.initials}</Avatar><Box className="trouble-main"><Typography>{trouble.title}</Typography><Box><span className="category-label">{trouble.category}</span><span className={`status status-${trouble.status === '解決済み' ? 'done' : 'open'}`}>{trouble.status}</span></Box></Box><Typography className="trouble-date">{trouble.date}</Typography><ChevronRight className="row-chevron" /></Box>) : <Box className="empty-state">検索条件に一致するトラブルはありません。</Box>}</Box></Paper><Box className="right-column"><Paper className="ai-card"><Box className="ai-icon"><AutoAwesome /></Box><Typography className="section-kicker">AI ASSISTANT</Typography><Typography className="ai-title">原因がわからない<br />エラーがありますか？</Typography><Typography className="ai-copy">エラーメッセージと状況を入力すると、考えられる原因と解決策を提案します。</Typography><Button variant="contained" onClick={() => setSnackbar('AI相談は次のステップで利用できます')} endIcon={<ChevronRight />}>AIに相談する</Button></Paper><Paper className="tip-card"><Typography className="section-kicker">TIP OF THE DAY</Typography><Typography className="tip-title">解決策だけでなく、<br />原因も記録しましょう。</Typography><Typography className="tip-copy">原因を残すことで、同じエラーに出会ったときの解決が早くなります。</Typography></Paper></Box></Box>
        </Box>
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm"><DialogTitle>トラブルを登録<IconButton onClick={() => setDialogOpen(false)}><Close /></IconButton></DialogTitle><DialogContent><TextField autoFocus fullWidth label="タイトル" placeholder="例：DjangoのALLOWED_HOSTSエラー" value={newTitle} onChange={(event) => setNewTitle(event.target.value)} sx={{ mt: 1, mb: 2 }} /><Select fullWidth value={newCategory} onChange={(event) => setNewCategory(event.target.value)}>{['Python', 'Django', 'Git', 'PostgreSQL', 'Docker', 'Linux'].map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)}</Select><TextField fullWidth multiline minRows={3} label="エラー内容（任意）" placeholder="エラーメッセージや発生した状況" sx={{ mt: 2 }} /></DialogContent><DialogActions><Button onClick={() => setDialogOpen(false)}>キャンセル</Button><Button variant="contained" onClick={registerTrouble} disabled={!newTitle.trim()}>登録する</Button></DialogActions></Dialog>
      <Snackbar open={Boolean(snackbar)} autoHideDuration={2600} onClose={() => setSnackbar('')} message={snackbar} />
    </Box>
  )
}

function StatCard({ icon, label, value, trend, color }: { icon: React.ReactNode; label: string; value: number | string; trend: string; color: string }) {
  return <Paper className="stat-card"><Box className={`stat-icon ${color}`}>{icon}</Box><Box><Typography className="stat-label">{label}</Typography><Typography className="stat-value">{value}</Typography><Typography className={`stat-trend ${color}`}>{trend}</Typography></Box></Paper>
}

function NotificationsDot() { return <Box className="notification-icon"><DescriptionOutlined /><i /></Box> }

export default App
