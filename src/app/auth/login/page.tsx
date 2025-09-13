"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Lock, User } from "lucide-react";
import { useState } from "react";

const Login = () => {
    const [facultyCode, setFacultyCode] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (facultyCode && password) {
            // Write authentication logic here
            console.log("Logging in with:", { facultyCode, password });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-3">
                        <GraduationCap className="h-12 w-12 text-primary" />
                        <h1 className="text-3xl font-bold text-primary">Brainware University</h1>
                    </div>
                </div>

                <Card className="shadow-elevated">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">Faculty Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your faculty credentials to access the portal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="faculty-code">Faculty Code</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="faculty-code"
                                        type="text"
                                        placeholder="Enter your faculty code"
                                        value={facultyCode}
                                        onChange={(e) => setFacultyCode(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <Button className="w-full" onClick={handleLogin}>
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;