import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Header from '../../components/layout/Header';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Styled components for mobile responsiveness
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ApplicationCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(1),
  },
}));

interface Application {
  id: number;
  applicantName: string;
  position: string;
  appliedDate: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected' | 'approved';
  experience: string;
  skills: string[];
  avatar?: string;
  rejectReason?: string;
  rejectDate?: string;
}

const mockApplications: Application[] = [
  {
    id: 1,
    applicantName: 'Ahmet Yılmaz',
    position: 'Senior Frontend Developer',
    appliedDate: '2024-03-20',
    status: 'pending',
    experience: '5 yıl',
    skills: ['React', 'TypeScript', 'Node.js'],
    avatar: '/path-to-avatar.jpg',
  },
  {
    id: 2,
    applicantName: 'Ayşe Demir',
    position: 'UI/UX Designer',
    appliedDate: '2024-03-19',
    status: 'reviewing',
    experience: '3 yıl',
    skills: ['Figma', 'Adobe XD', 'UI Design'],
    avatar: '/path-to-avatar.jpg',
  },
  {
    id: 3,
    applicantName: 'Mehmet Kaya',
    position: 'Backend Developer',
    appliedDate: '2024-03-18',
    status: 'accepted',
    experience: '4 yıl',
    skills: ['Python', 'Django', 'PostgreSQL'],
    avatar: '/path-to-avatar.jpg',
  },
];

const statusColors = {
  pending: 'warning',
  reviewing: 'info',
  accepted: 'success',
  rejected: 'error',
  approved: 'success',
} as const;

const statusLabels = {
  pending: 'Beklemede',
  reviewing: 'İnceleniyor',
  accepted: 'Kabul Edildi',
  rejected: 'Reddedildi',
  approved: 'Onaylandı',
} as const;

const CorporateApplications: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applications, setApplications] = useState(mockApplications);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [acceptDetails, setAcceptDetails] = useState({ date: '', time: '', details: '' });
  const [contractDialogOpen, setContractDialogOpen] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, application: Application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplication(application);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApplication(null);
  };

  const handleStatusChange = (newStatus: Application['status']) => {
    if (selectedApplication) {
      // Dummy bildirim oluştur
      const notifications = JSON.parse(localStorage.getItem('individual_notifications') || '[]');
      let title = '';
      let desc = '';
      if (newStatus === 'accepted') {
        title = 'Başvurunuz Kabul Edildi';
        desc = `${selectedApplication.applicantName} başvurunuz kabul edildi.`;
      } else if (newStatus === 'rejected') {
        title = 'Başvurunuz Reddedildi';
        desc = `${selectedApplication.applicantName} başvurunuz reddedildi.`;
      } else if (newStatus === 'reviewing') {
        title = 'Başvurunuz İnceleniyor';
        desc = `${selectedApplication.applicantName} başvurunuz inceleme aşamasında.`;
      }
      if (title) {
        notifications.push({
          id: Date.now(),
          type: 'application',
          title,
          desc,
          date: new Date().toLocaleString(),
          applicationId: selectedApplication.id,
          read: false
        });
        localStorage.setItem('individual_notifications', JSON.stringify(notifications));
      }
      if (newStatus === 'rejected') {
        setRejectDialogOpen(true);
        return;
      }
      if (newStatus === 'accepted') {
        setAcceptDialogOpen(true);
        return;
      }
      setApplications(prev => prev.map(app =>
        app.id === selectedApplication.id ? { ...app, status: newStatus } : app
      ));
    }
    handleMenuClose();
  };

  const handleRejectConfirm = () => {
    // Burada Supabase'e red nedeni ile bildirim gönderilebilir ve kayıt tutulabilir
    setApplications(prev => prev.map(app =>
      app.id === selectedApplication?.id ? { ...app, status: 'rejected', rejectReason, rejectDate: new Date().toISOString() } : app
    ));
    setRejectDialogOpen(false);
    setRejectReason('');
    handleMenuClose();
    setSnackbar({ open: true, message: 'Red sebebiniz başarıyla iletildi.' });
    // Bildirim gönderme işlemi burada yapılacak
  };

  const handleAcceptConfirm = () => {
    setAcceptDialogOpen(false);
    setContractDialogOpen(true);
  };

  const handleContractConfirm = () => {
    // Burada Supabase'e kabul ve sözleşme onayı ile bildirim gönderilebilir ve kayıt tutulabilir
    setApplications(prev => prev.map(app =>
      app.id === selectedApplication?.id ? { ...app, status: 'accepted', acceptDate: new Date().toISOString(), contractAccepted: true } : app
    ));
    setContractDialogOpen(false);
    setContractAccepted(false);
    setAcceptDetails({ date: '', time: '', details: '' });
    handleMenuClose();
    setSnackbar({ open: true, message: 'İşe alımınız tamamlanmıştır.' });
    // Bildirim gönderme işlemi burada yapılacak
  };

  // Başvuruların status'unu localStorage'daki approved_applications'a göre güncelle
  const approvedIds = JSON.parse(localStorage.getItem('approved_applications') || '[]');
  const applicationsWithApproved = applications.map(app =>
    approvedIds.includes(app.id) ? { ...app, status: 'approved' } : app
  );
  const filteredApplications = applicationsWithApproved.filter(app => {
    switch (currentTab) {
      case 0: return app.status === 'pending';
      case 1: return app.status === 'reviewing';
      case 2: return app.status === 'accepted';
      case 3: return app.status === 'rejected';
      case 4: return app.status === 'approved';
      default: return true;
    }
  });

  return (
    <>
      <Header userType="corporate" />
      <Box sx={{ mt: 8 }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Başvurular
          </Typography>

          <StyledPaper elevation={3}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant={isMobile ? 'scrollable' : 'fullWidth'}
                scrollButtons={isMobile ? 'auto' : false}
                aria-label="application status tabs"
              >
                <Tab label="Bekleyen" />
                <Tab label="İncelenen" />
                <Tab label="Kabul Edilen" />
                <Tab label="Reddedilen" />
                <Tab label="Onaylanan" />
              </Tabs>
            </Box>

            <Box sx={{ display: 'grid', gap: 2 }}>
              {filteredApplications.map((application) => (
                <ApplicationCard key={application.id}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={application.avatar}
                          alt={application.applicantName}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography variant="h6" component="div">
                            {application.applicantName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {application.position}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Başvuru Tarihi: {application.appliedDate}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={statusLabels[application.status]}
                          color={statusColors[application.status]}
                          size="small"
                        />
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, application)}
                          size="small"
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        Deneyim: {application.experience}
                      </Typography>
                      {application.skills.map((skill) => (
                        <Chip
                          key={skill}
                          label={skill}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      {/* <Button
                        variant="outlined"
                        size="small"
                        onClick={() => window.open(`/resume/${application.id}`, '_blank')}
                      >
                        CV Görüntüle
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => window.open(`/profile/${application.id}`, '_blank')}
                      >
                        Profili Görüntüle
                      </Button> */}
                    </Box>

                    {currentTab === 2 ? (
                      <Link
                        to={`/corporate/applications/${application.id}`}
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        Detayları Görüntüle <ChevronRight size={16} />
                      </Link>
                    ) : currentTab === 4 ? (
                      <Link
                        to={`/corporate/applications/${application.id}?chat=1`}
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        Detayları Görüntüle <ChevronRight size={16} />
                      </Link>
                    ) : (
                      <Link
                        to={`/corporate/applications/${application.id}`}
                        className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                      >
                        Detayları Görüntüle <ChevronRight size={16} />
                      </Link>
                    )}
                  </CardContent>
                </ApplicationCard>
              ))}
            </Box>
          </StyledPaper>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {selectedApplication?.status === 'pending' && (
              <MenuItem onClick={() => handleStatusChange('reviewing')}>İncelemeye Al</MenuItem>
            )}
            {selectedApplication?.status === 'pending' || selectedApplication?.status === 'reviewing' ? (
              <MenuItem onClick={() => handleStatusChange('accepted')}>Kabul Et</MenuItem>
            ) : null}
            {selectedApplication?.status !== 'rejected' && (
              <MenuItem onClick={() => handleStatusChange('rejected')}>Reddet</MenuItem>
            )}
          </Menu>

          {/* Red Sebebi Dialog */}
          <Dialog open={rejectDialogOpen} onClose={() => setRejectDialogOpen(false)}>
            <DialogTitle>Red Sebebini Giriniz</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Red Sebebi"
                type="text"
                fullWidth
                required
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                error={!rejectReason.trim()}
                helperText={!rejectReason.trim() ? 'Red sebebi zorunludur.' : ''}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setRejectDialogOpen(false)}>İptal</Button>
              <Button onClick={handleRejectConfirm} disabled={!rejectReason.trim()}>Gönder</Button>
            </DialogActions>
          </Dialog>

          {/* Kabul Detayları Dialog */}
          <Dialog open={acceptDialogOpen} onClose={() => setAcceptDialogOpen(false)}>
            <DialogTitle>Kabul Detayları</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Tarih"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={acceptDetails.date}
                onChange={e => setAcceptDetails({ ...acceptDetails, date: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Saat"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={acceptDetails.time}
                onChange={e => setAcceptDetails({ ...acceptDetails, time: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Diğer Detaylar"
                type="text"
                fullWidth
                value={acceptDetails.details}
                onChange={e => setAcceptDetails({ ...acceptDetails, details: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAcceptDialogOpen(false)}>İptal</Button>
              <Button onClick={handleAcceptConfirm} disabled={!acceptDetails.date || !acceptDetails.time}>Onayla</Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar Bilgilendirme */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ open: false, message: '' })}
            message={snackbar.message}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </Container>
      </Box>
    </>
  );
};

export default CorporateApplications; 