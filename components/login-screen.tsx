/**
 * login-screen.tsx — Componente principal de la pantalla de Login.
 *
 * Responsabilidades:
 *  1. Contener el estado del formulario (email, password, resultado).
 *  2. Definir las credenciales válidas (hardcodeadas, solo para demo).
 *  3. Ejecutar la lógica de validación al presionar "INGRESAR".
 *  4. Renderizar el layout visual que imita el diseño entregado.
 *
 * Estructura visual (de arriba hacia abajo):
 *  - Header violeta con título
 *  - Área central con los inputs y el botón
 *  - Links de "Olvidaste la clave?" y "Crear Cuenta"
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// ─── Credenciales hardcodeadas (solo para propósitos de aprendizaje) ──────────
// En una app real estas vendrían de una API de autenticación (ej. Firebase Auth,
// JWT contra un backend, etc.)
const VALID_EMAIL = 'simon@galaxies.dev';
const VALID_PASSWORD = '12345678';
// ─────────────────────────────────────────────────────────────────────────────

// Paleta de colores principal de la app
const PURPLE = '#7B5CF5';
const PURPLE_DARK = '#6B4CE5'; // para el estado "pressed" del botón

export default function LoginScreen() {
  // ── Estado del formulario ──────────────────────────────────────────────────
  // `email` y `password` almacenan lo que el usuario va escribiendo.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // `loginResult` puede ser:
  //   null    → todavía no se intentó loguear
  //   'ok'    → credenciales correctas
  //   'error' → credenciales incorrectas
  const [loginResult, setLoginResult] = useState<'ok' | 'error' | null>(null);
  // ──────────────────────────────────────────────────────────────────────────

  /**
   * handleLogin — Se llama al presionar el botón "INGRESAR".
   * Compara los valores del formulario contra las credenciales hardcodeadas
   * y actualiza el estado `loginResult` en consecuencia.
   */
  const handleLogin = () => {
    // trim() evita que espacios accidentales al inicio/fin causen un falso error
    if (email.trim() === VALID_EMAIL && password === VALID_PASSWORD) {
      setLoginResult('ok');
    } else {
      setLoginResult('error');
    }
  };

  return (
    /**
     * SafeAreaView — Respeta los márgenes seguros del dispositivo
     * (notch, Dynamic Island, barra de inicio de iOS, etc.)
     */
    <SafeAreaView style={styles.safeArea}>
      {/* Header violeta con el título de la app */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Login App (Apellido, Apellido)</Text>
      </View>

      {/**
       * KeyboardAvoidingView — Empuja el contenido hacia arriba cuando el
       * teclado virtual aparece, evitando que tape los inputs.
       * En iOS se usa 'padding'; en Android suele bastar con 'height'.
       */}
      <KeyboardAvoidingView
        style={styles.body}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.formContainer}>
          {/* ── Input de Email ─────────────────────────────────────────── */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            // keyboardType muestra el teclado optimizado para emails (@, .com, etc.)
            keyboardType="email-address"
            // autoCapitalize evita que el primer carácter se escriba en mayúscula
            autoCapitalize="none"
            value={email}
            // onChangeText se dispara cada vez que el usuario escribe un carácter
            onChangeText={setEmail}
          />

          {/* ── Input de Contraseña ────────────────────────────────────── */}
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            // secureTextEntry oculta los caracteres con bullets (●●●●●)
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* ── Mensaje de resultado (éxito o error) ──────────────────── */}
          {loginResult === 'ok' && (
            <Text style={styles.successMessage}>
              ✅ ¡Bienvenido! Inicio de sesión exitoso.
            </Text>
          )}
          {loginResult === 'error' && (
            <Text style={styles.errorMessage}>
              ❌ Email o contraseña incorrectos. Intentá de nuevo.
            </Text>
          )}

          {/* ── Botón principal ────────────────────────────────────────── */}
          {/**
           * TouchableOpacity — Componente presionable que reduce la opacidad
           * al ser tocado, dando feedback visual al usuario.
           * activeOpacity controla cuánto se opaca al presionar (0=invisible, 1=sin cambio).
           */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>INGRESAR</Text>
          </TouchableOpacity>

          {/* ── Links secundarios ─────────────────────────────────────── */}
          {/**
           * Estos links no tienen funcionalidad real en este TP, solo
           * están para que el layout coincida con el diseño entregado.
           * En una app real usarían `router.push('/forgot-password')`, etc.
           */}
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.link}>Olvidaste la clave?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.link}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────────
/**
 * StyleSheet.create() — Genera los estilos de forma optimizada.
 * React Native usa un subset de CSS; las propiedades usan camelCase
 * (ej. `backgroundColor` en vez de `background-color`).
 * Las unidades son independientes de pantalla (dp), no píxeles absolutos.
 */
const styles = StyleSheet.create({
  // Ocupa toda la pantalla y define el fondo gris claro
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  // Franja violeta superior con el título
  header: {
    backgroundColor: PURPLE,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Área central; `flex: 1` hace que ocupe todo el espacio restante
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },

  // Contenedor del formulario — apila los elementos verticalmente con gap
  formContainer: {
    gap: 14,
  },

  // Estilo compartido por ambos inputs
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#333',
  },

  // Botón violeta principal
  button: {
    backgroundColor: PURPLE,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    shadowColor: PURPLE_DARK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // Links de texto centrados
  link: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    marginTop: 2,
  },

  // Mensajes de feedback
  successMessage: {
    color: '#1a7a3a',
    backgroundColor: '#d4edda',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#842029',
    backgroundColor: '#f8d7da',
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});