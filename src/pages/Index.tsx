import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';

interface Master {
  id: number;
  name: string;
  specialization: string;
  phone: string;
  email: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const Index = () => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
  ];

  useEffect(() => {
    setMasters([
      { id: 1, name: 'Анна Смирнова', specialization: 'Стилист-универсал', phone: '+7 (999) 123-45-67', email: 'anna@salon.ru' },
      { id: 2, name: 'Мария Петрова', specialization: 'Колорист', phone: '+7 (999) 234-56-78', email: 'maria@salon.ru' },
      { id: 3, name: 'Екатерина Иванова', specialization: 'Барбер', phone: '+7 (999) 345-67-89', email: 'kate@salon.ru' },
    ]);

    setServices([
      { id: 1, name: 'Женская стрижка', description: 'Стрижка любой сложности', duration_minutes: 60, price: 1500 },
      { id: 2, name: 'Мужская стрижка', description: 'Классическая мужская стрижка', duration_minutes: 45, price: 1000 },
      { id: 3, name: 'Окрашивание', description: 'Окрашивание волос профессиональными красителями', duration_minutes: 120, price: 3500 },
      { id: 4, name: 'Укладка', description: 'Профессиональная укладка волос', duration_minutes: 30, price: 800 },
      { id: 5, name: 'Стрижка бороды', description: 'Моделирование и уход за бородой', duration_minutes: 30, price: 700 },
      { id: 6, name: 'Комплекс: стрижка + укладка', description: 'Женская стрижка с укладкой', duration_minutes: 90, price: 2000 },
    ]);
  }, []);

  const handleBooking = () => {
    if (!selectedMaster || !selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Запись создана!',
      description: `Вы записаны на ${selectedDate.toLocaleDateString()} в ${selectedTime}`,
    });

    setBookingOpen(false);
    setClientName('');
    setClientPhone('');
    setSelectedMaster(null);
    setSelectedService(null);
    setSelectedTime(null);
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Scissors" className="text-primary" size={24} />
            <span className="text-xl font-semibold">Salon Beauty</span>
          </div>
          <div className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors">
              Услуги
            </button>
            <button onClick={() => scrollToSection('masters')} className="text-sm font-medium hover:text-primary transition-colors">
              Мастера
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
              Контакты
            </button>
          </div>
          <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="Calendar" size={18} />
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Онлайн-запись</DialogTitle>
                <DialogDescription>Выберите мастера, услугу и удобное время</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <Label>Выберите услугу</Label>
                  <Select value={selectedService?.toString()} onValueChange={(value) => setSelectedService(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name} - {service.price} ₽
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Выберите мастера</Label>
                  <Select value={selectedMaster?.toString()} onValueChange={(value) => setSelectedMaster(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите мастера" />
                    </SelectTrigger>
                    <SelectContent>
                      {masters.map((master) => (
                        <SelectItem key={master.id} value={master.id.toString()}>
                          {master.name} - {master.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Выберите дату</Label>
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />
                </div>

                <div className="grid gap-2">
                  <Label>Выберите время</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? 'default' : 'outline'}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="w-full"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Иван Иванов" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} placeholder="+7 (999) 123-45-67" />
                </div>

                <Button onClick={handleBooking} size="lg" className="w-full">
                  Подтвердить запись
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section id="home" className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Красота начинается здесь
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Профессиональные услуги парикмахерского искусства от лучших мастеров города. Запишитесь онлайн за 2 минуты.
              </p>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => setBookingOpen(true)} className="gap-2">
                  <Icon name="Calendar" size={20} />
                  Записаться онлайн
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                  Наши услуги
                </Button>
              </div>
            </div>
            <div className="flex-1 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-12 backdrop-blur">
                  <div className="grid grid-cols-2 gap-6">
                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="text-3xl">500+</CardTitle>
                        <CardDescription>Довольных клиентов</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="text-3xl">3</CardTitle>
                        <CardDescription>Мастера</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="text-3xl">15+</CardTitle>
                        <CardDescription>Услуг</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="text-center">
                      <CardHeader>
                        <CardTitle className="text-3xl">5</CardTitle>
                        <CardDescription>Лет опыта</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground text-lg">Широкий спектр профессиональных услуг для вашей красоты</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <Icon name="Sparkles" className="text-primary" size={24} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Clock" size={16} />
                      {service.duration_minutes} мин
                    </div>
                    <div className="text-2xl font-bold text-primary">{service.price} ₽</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="masters" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наши мастера</h2>
            <p className="text-muted-foreground text-lg">Профессионалы своего дела с многолетним опытом</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {masters.map((master, index) => (
              <Card key={master.id} className="text-center hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Icon name="User" size={48} className="text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{master.name}</CardTitle>
                  <CardDescription className="text-base">
                    <Badge variant="secondary" className="mt-2">
                      {master.specialization}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Phone" size={16} />
                      {master.phone}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Mail" size={16} />
                      {master.email}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-muted-foreground text-lg">Мы всегда рады вас видеть</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <Icon name="MapPin" className="mx-auto mb-4 text-primary" size={32} />
                <CardTitle>Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 10</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="Phone" className="mx-auto mb-4 text-primary" size={32} />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+7 (999) 000-00-00</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <Icon name="Clock" className="mx-auto mb-4 text-primary" size={32} />
                <CardTitle>Часы работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ежедневно<br />9:00 - 21:00</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Salon Beauty. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;