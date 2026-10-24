export type CompanyConfig = {
  brand: string;
  tagline: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  whatsapp: string;
  telegram: string;
  currency: string;
  serviceArea: string;
  legalName: string;
  address: string;
  hours: string;
};

/** Set customer-specific facts here. Empty contact fields stay hidden in the interface. */
export const company: CompanyConfig = {
  brand: 'Дом / Проект',
  tagline: 'Строительство и ремонт',
  city: '',
  country: '',
  phone: '',
  email: '',
  whatsapp: '',
  telegram: '',
  currency: '',
  serviceArea: '',
  legalName: '',
  address: '',
  hours: '',
};

export const services = [
  { number: '01', title: 'Ремонт квартир', text: 'От обновления отдельной комнаты до комплексного преображения пространства.', icon: 'interior' },
  { number: '02', title: 'Строительство домов', text: 'Продумываем последовательность работ, чтобы путь от участка до дома был понятным.', icon: 'house' },
  { number: '03', title: 'Инженерные системы', text: 'Электрика, водоснабжение, отопление и вентиляция в общей логике проекта.', icon: 'systems' },
  { number: '04', title: 'Отделочные работы', text: 'Точная работа с фактурами, узлами и деталями, которые формируют ощущение качества.', icon: 'finish' },
];

export const faqs = [
  { q: 'С чего начинается работа?', a: 'С короткого разговора о задаче. Мы уточняем объект, пожелания и сроки, затем предлагаем подходящий формат знакомства с проектом.' },
  { q: 'Можно узнать стоимость до встречи?', a: 'Для предметной оценки нужны исходные данные: состав работ, площадь, состояние объекта и выбранные материалы. После брифа мы подскажем, что понадобится для расчёта.' },
  { q: 'Работаете ли вы за пределами города?', a: 'География зависит от команды конкретного исполнителя. Укажите свой город в брифе — это поможет сразу проверить возможность выезда.' },
  { q: 'Можно заказать только часть работ?', a: 'Да, запрос может касаться отдельного этапа или комплекса работ. Опишите нужный результат — мы обозначим, с чего начать.' },
];
