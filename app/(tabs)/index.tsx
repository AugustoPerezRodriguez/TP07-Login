/**
 * index.tsx — Pantalla principal de la app (ruta raíz del tab navigator).
 *
 * Al usar Expo Router, este archivo define qué se muestra en la primera tab.
 * Lo mantenemos intencionalmente simple: solo importa y re-exporta LoginScreen.
 *
 * Esto sigue el principio de separación de responsabilidades:
 *   - La ruta (este archivo) no sabe nada de UI.
 *   - El componente (login-screen.tsx) no sabe nada de routing.
 *
 * Si en el futuro querés navegar post-login (ej. ir a un Dashboard),
 * lo harías desde login-screen.tsx usando `router.replace('/dashboard')`.
 */

import LoginScreen from '@/components/login-screen';

export default LoginScreen;