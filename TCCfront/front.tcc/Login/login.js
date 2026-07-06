const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const companyIdInput = document.getElementById('companyId');
const passwordInput = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const cancelRecovery = document.getElementById('cancelRecovery');
const sendRecovery = document.getElementById('sendRecovery');
const recoveryEmail = document.getElementById('recoveryEmail');

// ========================================
// PASSWORD TOGGLE
// ========================================

passwordToggle.addEventListener('click', (e) => {
  e.preventDefault();
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  passwordToggle.textContent = isPassword ? '🙈' : '👁️';
});

// ========================================
// FORM VALIDATION
// ========================================

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateCompanyId(id) {
  return id.trim().length >= 6;
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  successMessage.classList.remove('show');
  setTimeout(() => {
    errorMessage.classList.remove('show');
  }, 5000);
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.add('show');
  errorMessage.classList.remove('show');
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);
}

// ========================================
// FORM SUBMISSION
// ========================================

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Limpar mensagens anteriores
  errorMessage.classList.remove('show');
  successMessage.classList.remove('show');

  // Obter valores
  const email = emailInput.value.trim();
  const companyId = companyIdInput.value.trim();
  const password = passwordInput.value;

  // Validações
  if (!email) {
    showError('Por favor, insira seu email.');
    emailInput.focus();
    return;
  }

  if (!validateEmail(email)) {
    showError('Por favor, insira um email válido.');
    emailInput.focus();
    return;
  }

  if (!companyId) {
    showError('Por favor, insira o ID da empresa.');
    companyIdInput.focus();
    return;
  }

  if (!validateCompanyId(companyId)) {
    showError('O ID da empresa deve ter pelo menos 6 caracteres.');
    companyIdInput.focus();
    return;
  }

  if (!password) {
    showError('Por favor, insira sua senha.');
    passwordInput.focus();
    return;
  }

  if (!validatePassword(password)) {
    showError('A senha deve ter pelo menos 6 caracteres.');
    passwordInput.focus();
    return;
  }

  // Simular envio
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  try {
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validação simulada (aceita qualquer combinação válida)
    showSuccess('Login realizado com sucesso! Redirecionando...');

    // Simular redirecionamento
    setTimeout(() => {
      // Em produção, redirecionar para o dashboard
      // window.location.href = '/dashboard';
      alert('Em produção, você seria redirecionado para o dashboard.\n\nEmail: ' + email + '\nEmpresa: ' + companyId);
    }, 1500);
  } catch (error) {
    showError('Erro ao conectar ao servidor. Tente novamente.');
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

// ========================================
// FORGOT PASSWORD MODAL
// ========================================

forgotPasswordLink.addEventListener('click', (e) => {
  e.preventDefault();
  forgotPasswordModal.style.display = 'flex';
  recoveryEmail.focus();
});

cancelRecovery.addEventListener('click', () => {
  forgotPasswordModal.style.display = 'none';
  recoveryEmail.value = '';
});

sendRecovery.addEventListener('click', async () => {
  const email = recoveryEmail.value.trim();

  if (!email) {
    alert('Por favor, insira seu email.');
    recoveryEmail.focus();
    return;
  }

  if (!validateEmail(email)) {
    alert('Por favor, insira um email válido.');
    recoveryEmail.focus();
    return;
  }

  sendRecovery.disabled = true;
  sendRecovery.textContent = 'Enviando...';

  try {
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Email de recuperação enviado para: ' + email);
    forgotPasswordModal.style.display = 'none';
    recoveryEmail.value = '';
  } catch (error) {
    alert('Erro ao enviar email. Tente novamente.');
  } finally {
    sendRecovery.disabled = false;
    sendRecovery.textContent = 'Enviar';
  }
});

// Fechar modal ao clicar fora
forgotPasswordModal.addEventListener('click', (e) => {
  if (e.target === forgotPasswordModal) {
    forgotPasswordModal.style.display = 'none';
    recoveryEmail.value = '';
  }
});

// ========================================
// REAL-TIME VALIDATION
// ========================================

emailInput.addEventListener('blur', () => {
  if (emailInput.value && !validateEmail(emailInput.value)) {
    emailInput.style.borderColor = '#ef4444';
  } else {
    emailInput.style.borderColor = '';
  }
});

companyIdInput.addEventListener('blur', () => {
  if (companyIdInput.value && !validateCompanyId(companyIdInput.value)) {
    companyIdInput.style.borderColor = '#ef4444';
  } else {
    companyIdInput.style.borderColor = '';
  }
});

passwordInput.addEventListener('blur', () => {
  if (passwordInput.value && !validatePassword(passwordInput.value)) {
    passwordInput.style.borderColor = '#ef4444';
  } else {
    passwordInput.style.borderColor = '';
  }
});

// ========================================
// ENTER KEY SUPPORT
// ========================================

[emailInput, companyIdInput, passwordInput].forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });
});

// ========================================
// ACCESSIBILITY
// ========================================

// Garantir que o foco seja gerenciado corretamente
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && forgotPasswordModal.style.display === 'flex') {
    forgotPasswordModal.style.display = 'none';
    recoveryEmail.value = '';
    forgotPasswordLink.focus();
  }
});

// ========================================
// INICIALIZAÇÃO
// ========================================

// Focar no primeiro campo ao carregar
window.addEventListener('load', () => {
  emailInput.focus();
});

// Limpar mensagens ao digitar
[emailInput, companyIdInput, passwordInput].forEach(input => {
  input.addEventListener('input', () => {
    errorMessage.classList.remove('show');
    successMessage.classList.remove('show');
  });
});
