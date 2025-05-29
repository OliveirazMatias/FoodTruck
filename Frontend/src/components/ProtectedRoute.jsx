import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('tipo_funcionario'); // Armazene o tipo de funcionário no login

  if (!token) {
    return <Navigate to="/login" replace />; // Redireciona para a página de login se não houver token
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />; // Redireciona para uma página de acesso negado
  }

  return children;
};

export default ProtectedRoute;
