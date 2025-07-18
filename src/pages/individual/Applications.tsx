import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Building, MapPin, Search, Filter, CheckCircle, UserCheck, Handshake, Flag } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';

const Applications = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      position: 'Senior Frontend Geliştirici',
      company: 'TechSoft A.Ş.',
      location: 'İstanbul',
      appliedDate: '15 Mart 2024',
      status: 'Değerlendiriliyor',
      statusColor: 'bg-yellow-100 text-yellow-800',
      logo: 'https://images.pexels.com/photos/15144262/pexels-photo-15144262.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    {
      id: 3,
      position: 'Backend Geliştirici',
      company: 'Yazılım Evi A.Ş.',
      location: 'İzmir',
      appliedDate: '10 Mart 2024',
      status: 'Reddedildi',
      statusColor: 'bg-error/10 text-error',
      logo: 'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
    {
      id: 4,
      position: 'Mobil Uygulama Geliştirici',
      company: 'Mobil Teknoloji Ltd.',
      location: 'İstanbul (Uzaktan)',
      appliedDate: '8 Mart 2024',
      status: 'Kabul Edildi',
      statusColor: 'bg-success/10 text-success',
      logo: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
    },
  ];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Başvuru aşamaları
  const steps = [
    { key: 'application', label: 'Başvuru', icon: <CheckCircle size={28} /> },
    { key: 'review', label: 'İnceleme', icon: <CheckCircle size={28} /> },
    { key: 'offer', label: 'Teklif', icon: <Handshake size={28} /> },
    { key: 'result', label: 'Sonuç', icon: <Flag size={28} /> },
  ];

  // Her başvuru için ilerleme yüzdesi (gerçek veriyle)
  const getProgressPercent = (status: string) => {
    switch (status) {
      case 'Değerlendiriliyor':
        return 25;
      case 'Teklif':
        return 50;
      case 'Kabul Edildi':
      case 'Reddedildi':
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header userType="individual" />
      
      <main className="flex-1 pt-16">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Başvurularım</h1>
                <p className="text-gray-600 mt-1">Tüm iş başvurularınızı buradan takip edebilirsiniz</p>
              </div>
              <Button 
                onClick={() => {/* Navigate to jobs */}}
                className="md:w-auto w-full justify-center"
              >
                Yeni İş İlanlarını Keşfet
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Pozisyon veya şirket ara"
                    className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tüm Başvurular</option>
                  <option value="Değerlendiriliyor">Değerlendiriliyor</option>
                  <option value="Kabul Edildi">Kabul Edildi</option>
                  <option value="Reddedildi">Reddedildi</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((application) => {
              const progressPercent = getProgressPercent(application.status);
              return (
                <div 
                  key={application.id} 
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={application.logo} 
                        alt={`${application.company} logo`}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{application.position}</h3>
                          <p className="text-gray-600">{application.company}</p>
                        </div>
                        <div className="md:text-right">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${application.statusColor}`}>
                            {application.status}
                          </span>
                          <div className="text-sm text-gray-500 mt-1 flex items-center md:justify-end">
                            <Clock size={14} className="mr-1" />
                            {application.appliedDate}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          <MapPin size={14} className="mr-1" />
                          {application.location}
                        </span>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/individual/jobs/${application.id}`)}
                        >
                          İlanı Görüntüle
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/individual/applications/${application.id}`)}
                        >
                          Başvuru Detayları
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Başvuru Durumu</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 text-blue-700 px-3 py-0.5 text-xs font-semibold">
                        <span>İLERLEME</span>
                        <span className="ml-1 font-bold">{Math.round(progressPercent)}%</span>
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    {/* Steps */}
                    <div className="flex justify-between items-center mt-2">
                      {steps.map((step, idx) => {
                        const isCompleted = idx < getProgressPercent(application.status);
                        const isActive = idx === getProgressPercent(application.status);
                        return (
                          <div key={step.key} className="flex flex-col items-center w-1/5">
                            <div
                              className={
                                isCompleted
                                  ? 'bg-green-500 text-white'
                                  : isActive
                                  ? 'bg-orange-500 text-white animate-pulse'
                                  : 'bg-gray-200 text-gray-400'
                              }
                              style={{ width: 36, height: 36, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4 }}
                            >
                              {step.icon}
                            </div>
                            <span
                              className={
                                isCompleted
                                  ? 'text-green-600 text-xs mt-1'
                                  : isActive
                                  ? 'text-orange-600 text-xs mt-1 font-semibold'
                                  : 'text-gray-400 text-xs mt-1'
                              }
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="text-gray-400" size={24} />
                </div>
                <h3 className="text-lg font-medium">Sonuç Bulunamadı</h3>
                <p className="text-gray-600 mt-1">
                  Arama kriterlerinize uygun başvuru bulunamadı.
                </p>
                <Button 
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Applications;