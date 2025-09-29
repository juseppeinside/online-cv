# Резюме

Современное интерактивное резюме, созданное с использованием React, TypeScript, GSAP и Tailwind CSS. Проект включает красивые анимации, плавную прокрутку и атмосферные визуальные эффекты.

[EN](README.md) / RU

<img width="100%" height="871" alt="изображение" src="https://github.com/user-attachments/assets/ee3344eb-0afe-4931-9102-690438adae18" />

[Демонстрация](https://online-cv-eta.vercel.app?utm_source=github) / [Дизайн в Figma](https://www.figma.com/design/94hp9BEkB7Vb0A41hRRqiY/CV_Resume_Draft?node-id=102-1175&p=f&t=I7X8sa4z4egPwpOk-0)


## 🛠 Технологии

- **Frontend**: React 19, TypeScript
- **Стили**: Tailwind CSS
- **Анимации**: GSAP
- **Сборка**: Vite
- **Линтинг**: Biome
- **Тестирование**: Playwright, Jest, Testing Library

## 🚀 Быстрый старт

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd online-cv
```

2. Установите зависимости:
```bash
npm install
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
```

4. Откройте [http://localhost:5173](http://localhost:5173) в браузере

## 📜 Прогресс

### 🏗️ Основа проекта
- [x] Инициализация проекта
- [x] Настройка зависимостей (React 19, TypeScript, GSAP, Tailwind CSS)
- [x] Настройка инструментов разработки (Vite, Biome, Husky)
- [x] Базовая конфигурация TypeScript и Tailwind

### 🎨 UI/UX Компоненты
- [x] Базовые компоненты с hover-эффектами (Button...)
- [x] Layout компонент для общей структуры
- [x] CustomCursor с интерактивными эффектами
- [x] SnowBackground для атмосферных эффектов
- [x] Компонент загрузки/прелоадера
- [x] Tooltip компонент
- [ ] Модальные окна
- [ ] Навигационное меню
- [ ] Мобильное меню

### 🎭 Анимации и эффекты
- [x] GSAP интеграция с ScrollTrigger
- [x] Анимации появления элементов при скролле
- [x] Parallax эффекты для секций
- [x] Smooth scroll между секциями
- [x] Микроанимации для интерактивных элементов

### 📄 Секции портфолио
- [x] FirstScreen - главный экран с представлением
- [x] AboutMe - информация о разработчике
- [x] MyStack - технический стек
- [x] MyExperience - опыт работы
- [x] Contacts - контактная информация
- [x] End - завершающая секция
- [ ] Блог

### 🔧 Функциональность
- [x] Адаптивный дизайн для всех устройств
- [x] Логирование с Pino
- [x] Утилиты для работы с классами (clsx, tailwind-merge)
- [x] Темная/светлая тема
- [x] Мультиязычность (i18n)
- [x] SEO оптимизация
- [x] Open Graph метатеги
- [x] Sitemap генерация

### 🎯 Производительность
- [x] Lazy loading для изображений
- [x] Code splitting для компонентов
- [x] Оптимизация бандла
- [x] WebP/AVIF поддержка изображений
- [x] Critical CSS inline
- [x] Preload ключевых ресурсов
- [ ] Service Worker для кэширования

### 🧪 Тестирование
- [x] Unit тесты для компонентов
- [x] E2E тесты с Playwright
- [ ] Интеграционные тесты
- [ ] Visual regression тесты
- [ ] Performance тесты
- [ ] Accessibility тесты

### 🚀 Деплой и DevOps
- [ ] CI/CD pipeline настройка
- [ ] Docker контейнеризация
- [ ] Мониторинг производительности
- [ ] Error tracking (Sentry)
- [ ] Analytics интеграция
- [ ] Автоматический деплой

### 📱 Дополнительные фичи
- [x] HDR QR код
- [ ] PWA поддержка
- [ ] Offline режим
- [ ] Sharer API для социальных сетей
- [ ] Экспорт CV в PDF

## 📄 Лицензия

MIT License - подробности в файле [LICENSE](LICENSE)

Создано с ❤️ и современными веб-технологиями
