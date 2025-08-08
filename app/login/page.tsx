"use client";

import { Button, Card, Input, useFormHandler, validateEmail, validateRequired } from "@prajwolpakka/antd-extended";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
	const router = useRouter();
	const [submitting, setSubmitting] = React.useState(false);
	const [authError, setAuthError] = React.useState<string | null>(null);
	const [showPassword, setShowPassword] = React.useState(false);

	const { values, errors, handleChange, validate } = useFormHandler({
		initialValues: {
			email: "",
			password: "",
		},
		validators: {
			email: (value) =>
				validateRequired(value) ? (validateEmail(value) ? null : "Invalid email format") : "Email is required",
			password: (value) => (validateRequired(value) ? null : "Password is required"),
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setAuthError(null);

		if (!validate()) return;

		setSubmitting(true);
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email: values.email,
				password: values.password,
			});

			if (result?.error) {
				// Normalize unclear technical messages into friendly text
				const raw = String(result.error || "").toLowerCase();

				let msg = "Invalid email or password";
				if (raw.includes("401")) {
					msg = "Invalid email or password";
				} else if (raw.includes("csrf") || raw.includes("forbidden")) {
					msg = "Session error. Please refresh the page and try again.";
				} else if (raw.includes("json") || raw.includes("unexpected end")) {
					// This often comes from a failed JSON parse in a 401/500 response body
					msg = "Login failed. Please check your email and password and try again.";
				} else if (raw.includes("network") || raw.includes("fetch")) {
					msg = "Network error. Check your connection and try again.";
				}

				setAuthError(msg);
			} else {
				// Set additional cookies after successful authentication
				try {
					await fetch("/api/auth/set-cookies", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							email: "user@example.com",
							id: "1",
							name: "Test User",
							role: "admin",
						}),
					});
				} catch (cookieError) {
					console.error("Failed to set additional cookies:", cookieError);
				}
				router.push("/dashboard");
			}
		} catch {
			setAuthError("Unexpected error occurred. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "2rem",
				background: "#f5f5f5",
			}}
		>
			<div style={{ width: "100%", maxWidth: 420 }}>
				{authError && (
					<div
						role="alert"
						style={{
							background: "#fff5f5",
							color: "#c53030",
							border: "1px solid #fed7d7",
							padding: "12px",
							borderRadius: 4,
							marginBottom: "1rem",
						}}
					>
						{authError}
					</div>
				)}

				<Card header="Welcome back">
					<form onSubmit={handleSubmit} aria-label="login form">
						<div style={{ marginBottom: "1.5rem" }}>
							<label htmlFor="email" style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
								Email
							</label>
							<Input
								id="email"
								placeholder="you@example.com"
								value={values.email}
								onChange={(e) => handleChange("email", e.target.value)}
								type="email"
								aria-invalid={!!errors.email}
								aria-describedby={errors.email ? "email-error" : undefined}
							/>
							{errors.email && (
								<div id="email-error" style={{ color: "#e53e3e", marginTop: 4, fontSize: 14 }} role="alert">
									{errors.email}
								</div>
							)}
						</div>

						<div style={{ marginBottom: "2rem" }}>
							<label htmlFor="password" style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
								Password
							</label>
							<div style={{ position: "relative" }}>
								<Input
									id="password"
									placeholder="Enter your password"
									value={values.password}
									onChange={(e) => handleChange("password", e.target.value)}
									type={showPassword ? "text" : "password"}
									aria-invalid={!!errors.password}
									aria-describedby={errors.password ? "password-error" : undefined}
								/>
								<button
									type="button"
									onClick={() => setShowPassword((s) => !s)}
									aria-label={showPassword ? "Hide password" : "Show password"}
									style={{
										position: "absolute",
										right: 12,
										top: "50%",
										transform: "translateY(-50%)",
										background: "transparent",
										border: "none",
										cursor: "pointer",
										color: "#666",
										fontSize: 14,
									}}
								>
									{showPassword ? "Hide" : "Show"}
								</button>
							</div>
							{errors.password && (
								<div id="password-error" style={{ color: "#e53e3e", marginTop: 4, fontSize: 14 }} role="alert">
									{errors.password}
								</div>
							)}
						</div>

						<Button variant="primary" htmlType="submit" style={{ width: "100%" }} disabled={submitting}>
							{submitting ? "Signing in…" : "Sign In"}
						</Button>

						<div
							style={{
								marginTop: "1rem",
								textAlign: "center",
								fontSize: 14,
								color: "#666",
							}}
						>
							Demo User: user@example.com / Password123!
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
