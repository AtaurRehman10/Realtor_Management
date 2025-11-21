# Realtor Frontend

A modern, full-featured realtor management platform built with React and Vite. This application provides comprehensive tools for managing realtors, tracking referrals, and processing payouts with role-based access control for both administrators and affiliate realtors.

## 🚀 Features

### Authentication & Authorization
- **Secure Login System** - JWT-based authentication with protected routes
- **User Registration** - Multi-step registration with profile image upload
- **Password Recovery** - Forgot password functionality with email verification
- **Role-Based Access Control** - Separate dashboards for Admin and Affiliate roles

### Admin Dashboard
- **Dashboard Overview** - Real-time analytics and key metrics visualization
- **Realtor Management**
  - View all registered realtors
  - Add, edit, and delete realtor profiles
  - View detailed realtor information and associated referrals
  - Manage commission rates and contact details
- **Referral Tracking** - Monitor all referrals across the platform
- **Payout Management** - Process and track commission payouts

### Realtor (Affiliate) Dashboard
- **Personal Dashboard** - View personal performance metrics and statistics
- **Referral Management** - Track and manage personal referrals
- **Settings & Profile** - Update profile information, contact details, and preferences

### UI/UX Features
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **Modern UI Components** - Built with Radix UI primitives for accessibility
- **Toast Notifications** - Real-time feedback using Sonner
- **Data Visualization** - Interactive charts and graphs with Recharts
- **Smooth Animations** - Enhanced user experience with Tailwind CSS animations

## 🛠️ Tech Stack

### Core
- **React 18.2** - Modern React with hooks and concurrent features
- **Vite 6.0** - Next-generation frontend tooling for fast development
- **React Router DOM 6.8** - Client-side routing with protected routes

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Tailwind Merge** - Intelligent Tailwind class merging
- **Class Variance Authority** - Type-safe component variants
- **Tailwind CSS Animate** - Pre-configured animations

### UI Components
- **Radix UI** - Unstyled, accessible component primitives
  - Checkbox
  - Label
  - Slot
- **Lucide React** - Beautiful, consistent icon set

### Data & API
- **Axios 1.13** - Promise-based HTTP client for API requests
- **Recharts 3.2** - Composable charting library

### Notifications
- **Sonner 2.0** - Elegant toast notifications

### Development Tools
- **ESBuild** - Fast JavaScript bundler
- **Vite Plugin React** - Official React plugin for Vite
- **Anima Screen Graph** - Visual development tools

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Realtor-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🏗️ Build

To create a production build:

```bash
npm run build
```

The optimized files will be generated in the `dist` directory.

## 📁 Project Structure

```
Realtor-Frontend/
├── src/
│   ├── api/              # API service layer and axios configuration
│   ├── component/        # React components
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminPayouts.jsx
│   │   ├── AdminRealtors.jsx
│   │   ├── AdminReferrals.jsx
│   │   ├── Adminsidebar.jsx
│   │   ├── EditRealtor.jsx
│   │   ├── Layout.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RealtorDashboard.jsx
│   │   ├── RealtorReferrals.jsx
│   │   ├── RealtorSetting.jsx
│   │   ├── Realtorsidebar.jsx
│   │   ├── ViewRealtor.jsx
│   │   └── header.jsx
│   ├── screens/          # Page-level components
│   │   ├── ForgotPassword.jsx
│   │   ├── login.jsx
│   │   └── register.jsx
│   └── index.jsx         # Application entry point
├── index.html            # HTML template
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment configuration
└── package.json          # Project dependencies and scripts

```

## 🔐 Authentication Flow

1. **Login** - Users authenticate with email and password
2. **Token Storage** - JWT tokens are stored securely in localStorage
3. **Protected Routes** - Routes are protected based on user role (admin/affiliate)
4. **Auto-redirect** - Unauthorized access redirects to login page

## 🎨 Styling Guidelines

The project uses Tailwind CSS with custom configurations:

- **Fonts**: Poppins (500, 400, 700) and Montserrat (400, 500, 700)
- **Custom Colors**: Defined in `tailwind.config.js`
- **Responsive Breakpoints**: Mobile-first approach
- **Dark Mode**: Support for dark mode variants

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI** (optional)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

   Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

The application can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

Simply build the project and upload the `dist` folder.

## 🔧 Configuration

### Vite Configuration
The `vite.config.js` includes:
- React plugin for Fast Refresh
- Screen graph plugin for visual development
- Custom build optimizations

### Tailwind Configuration
Custom theme extensions in `tailwind.config.js`:
- Custom color palette
- Extended spacing and sizing
- Animation utilities
- Custom component variants

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ using React and Vite**
