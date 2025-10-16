<template>
  <div class="app-layout">
    <div class="app-content">
      <!-- Sidebar -->
      <aside class="app-sidebar">
        <!-- Logo/Brand -->
        <div class="sidebar-brand">
          <div class="brand-icon">{ }</div>
          <span class="brand-text">Prome</span>
        </div>

        <nav class="sidebar-nav">
          <!-- Dashboard -->
          <NuxtLink to="/dashboard" class="nav-item" :class="{ active: $route.path === '/dashboard' }">
            <Icon name="heroicons:squares-2x2" class="nav-icon" />
            <span>Dashboard</span>
          </NuxtLink>

          <!-- New Requirement -->
          <NuxtLink to="/new-requirement" class="nav-item" :class="{ active: $route.path === '/new-requirement' }">
            <Icon name="heroicons:plus-circle" class="nav-icon" />
            <span>New Requirement</span>
          </NuxtLink>

          <!-- Features Section -->
          <div class="nav-section">
            <h3 class="nav-section-title">
              Features
            </h3>

            <NuxtLink to="/history" class="nav-item" :class="{ active: $route.path === '/history' }">
              <Icon name="heroicons:clock" class="nav-icon" />
              <span>History</span>
            </NuxtLink>

            <!-- Project 1 -->
            <div class="nav-group">
              <div class="nav-group-header">
                <Icon name="heroicons:folder" class="nav-icon" />
                <span>Project 1</span>
              </div>
              <div class="nav-subitems">
                <NuxtLink to="/project-1/requirement-1" class="nav-subitem">
                  <span>Requirement 1</span>
                </NuxtLink>
                <NuxtLink to="/project-1/requirement-2" class="nav-subitem">
                  <span>Requirement 2</span>
                </NuxtLink>
                <NuxtLink to="/project-1/requirement-3" class="nav-subitem">
                  <span>Requirement 3</span>
                </NuxtLink>
              </div>
            </div>

            <!-- Project 2 -->
            <div class="nav-group">
              <div class="nav-group-header">
                <Icon name="heroicons:folder" class="nav-icon" />
                <span>Project 2</span>
              </div>
              <div class="nav-subitems">
                <NuxtLink to="/project-2/requirement-1" class="nav-subitem">
                  <span>Requirement 1</span>
                </NuxtLink>
                <NuxtLink to="/project-2/requirement-2" class="nav-subitem">
                  <span>Requirement 2</span>
                </NuxtLink>
                <NuxtLink to="/project-2/requirement-3" class="nav-subitem">
                  <span>Requirement 3</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </nav>

        <!-- User Profile -->
        <div class="user-profile">
          <div class="user-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maxim" alt="Maxim Nuel">
          </div>
          <div class="user-info">
            <div class="user-name">
              Maxim Nuel
            </div>
            <div class="user-email">
              hey@agency.com
            </div>
          </div>
          <button class="user-menu-btn">
            <Icon name="heroicons:arrow-right-end-on-rectangle" />
          </button>
        </div>
      </aside>

      <!-- Main content -->
      <main class="app-main">
<<<<<<< HEAD
        <slot />
=======
        <div class="app-main__inner">
          <slot />
        </div>
>>>>>>> origin/main
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: #f8fafc;
}

.app-content {
  display: flex;
  height: 100vh;
  padding: 2rem;
  gap: 2rem;
<<<<<<< HEAD
=======
  max-width: 1600px;
  margin: 0 auto;
  min-height: 0;
>>>>>>> origin/main
}

.app-sidebar {
  width: 280px;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 1rem;
}

.brand-icon {
  font-size: 1.5rem;
  font-weight: 700;
  color: #d97706;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: #d97706;
  letter-spacing: -0.025em;
}

.sidebar-nav {
  flex: 1;
  padding: 0 1rem 1.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
}

.nav-item:hover {
  background: #f1f5f9;
  color: #334155;
}

.nav-item.active {
  background: #ede9fe;
  color: #7c3aed;
}

.nav-item.active .nav-icon {
  color: #7c3aed;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #94a3b8;
}

.nav-section {
  margin-top: 2rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.nav-group {
  margin-bottom: 1rem;
}

.nav-group-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #475569;
  font-weight: 500;
}

.nav-subitems {
  margin-left: 2.5rem;
}

.nav-subitem {
  display: block;
  padding: 0.5rem 1rem;
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  margin-bottom: 0.25rem;
}

.nav-subitem:hover {
  background: #f1f5f9;
  color: #64748b;
}

.user-profile {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
  background: #e2e8f0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.875rem;
}

.user-email {
  color: #64748b;
  font-size: 0.75rem;
}

.user-menu-btn {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.user-menu-btn:hover {
  background: #f1f5f9;
  color: #334155;
}

.app-main {
  flex: 1;
<<<<<<< HEAD
  overflow-y: auto;
  background: transparent;
=======
  min-height: 0;
  overflow-y: auto;
  background: transparent;
  display: flex;
}

.app-main__inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 0;
}

@media (min-width: 1800px) {
  .app-content {
    max-width: 1760px;
  }
}

@media (min-width: 2100px) {
  .app-content {
    max-width: 1920px;
  }
>>>>>>> origin/main
}

/* Mobile responsive */
@media (max-width: 768px) {
  .app-content {
    flex-direction: column;
    padding: 1rem;
<<<<<<< HEAD
=======
    max-width: none;
>>>>>>> origin/main
  }

  .app-sidebar {
    width: 100%;
    height: auto;
    order: 2;
    margin-top: 1rem;
  }

  .app-main {
    order: 1;
    height: auto;
  }
}
</style>
