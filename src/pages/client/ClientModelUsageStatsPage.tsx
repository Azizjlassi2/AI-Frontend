import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarChart2, Calendar, Clock, Download, Filter, HelpCircle, Info, AlertCircle, RefreshCw, Zap, Activity, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

import { BillingPeriod, ModelUsageData } from '../../types/shared';
import { UserDashboardSidebar } from '../../components/client/UserDashboardSidebar';
import { UserDashboardHeader } from '../../components/client/UserDashboardHeader';





export function ClientModelUsageStatsPage() {
    const {
        modelId
    } = useParams<{
        modelId: string;
    }>();
    const [usageData, setUsageData] = useState<ModelUsageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('overview');
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };
    // Color constants for charts
    const COLORS = {
        primary: '#3b82f6',
        secondary: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#22c55e',
        info: '#06b6d4',
        pieColors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
    };
    useEffect(() => {
        const fetchUsageData = async () => {
            setIsLoading(true);
            try {
                // In a real app, fetch from an API
                // Simulating API call with timeout
                await new Promise(resolve => setTimeout(resolve, 800));
                // Mock data for ArabicBERT model usage
                const mockUsageData: ModelUsageData = {
                    id: 1,
                    modelId: parseInt(modelId || '1'),
                    modelName: 'ArabicBERT',
                    planName: 'Plan Standard',
                    billingPeriod: BillingPeriod.MONTHLY,
                    apiCallsUsed: 23456,
                    apiCallsLimit: 50000,
                    apiCallsCost: null,
                    currency: 'TND',
                    startDate: '2023-12-15',
                    endDate: '2024-01-15',
                    dailyUsage: generateDailyUsageData(90),
                    errorRates: generateErrorRatesData(90),
                    endpoints: [{
                        name: '/predict',
                        calls: 15678,
                        percentage: 66.8
                    }, {
                        name: '/batch-predict',
                        calls: 4521,
                        percentage: 19.3
                    }, {
                        name: '/embeddings',
                        calls: 2104,
                        percentage: 9.0
                    }, {
                        name: '/info',
                        calls: 1153,
                        percentage: 4.9
                    }],
                    responseTime: generateResponseTimeData(90)
                };
                setUsageData(mockUsageData);
            } catch (error) {
                console.error('Error fetching usage data:', error);
                setError("Une erreur est survenue lors du chargement des statistiques d'utilisation.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsageData();
    }, [modelId]);
    // Function to generate mock daily usage data
    function generateDailyUsageData(days: number) {
        const data = [];
        const now = new Date();
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            // Generate some realistic looking data with weekly patterns
            const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            // Base value that varies by day of week
            const baseValue = isWeekend ? Math.floor(Math.random() * 200) + 50 : Math.floor(Math.random() * 600) + 200;
            // Add some random noise
            const noise = Math.floor(Math.random() * 100) - 50;
            const calls = Math.max(0, baseValue + noise);
            data.push({
                date: date.toISOString().split('T')[0],
                calls: calls,
                cost: calls * 0.001 // For pay-as-you-go models
            });
        }
        return data;
    }
    // Function to generate mock error rates data
    function generateErrorRatesData(days: number) {
        const data = [];
        const now = new Date();
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            const totalCalls = Math.floor(Math.random() * 1000) + 200;
            const successRate = 0.95 + Math.random() * 0.04; // 95-99% success rate
            const clientErrorRate = (1 - successRate) * 0.8; // Most errors are client errors
            const serverErrorRate = (1 - successRate) * 0.2; // Few server errors
            data.push({
                date: date.toISOString().split('T')[0],
                success: Math.floor(totalCalls * successRate),
                clientError: Math.floor(totalCalls * clientErrorRate),
                serverError: Math.floor(totalCalls * serverErrorRate)
            });
        }
        return data;
    }
    // Function to generate mock response time data
    function generateResponseTimeData(days: number) {
        const data = [];
        const now = new Date();
        for (let i = days; i >= 0; i--) {
            const date = new Date();
            date.setDate(now.getDate() - i);
            // Base response time around 120ms with some variation
            const baseAverage = 120 + (Math.random() * 40 - 20);
            data.push({
                date: date.toISOString().split('T')[0],
                average: Math.round(baseAverage),
                p95: Math.round(baseAverage * (1.5 + Math.random() * 0.3)) // p95 is 1.5-1.8x the average
            });
        }
        return data;
    }
    // Filter data based on selected date range
    const getFilteredData = (data: any[], days: number) => {
        if (days === 0) return data; // "all" option
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - days);
        const cutoffDateStr = cutoffDate.toISOString().split('T')[0];
        return data.filter(item => item.date >= cutoffDateStr);
    };
    // Handle refresh button click
    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            // In a real app, this would re-fetch the data
            await new Promise(resolve => setTimeout(resolve, 1000));
            // For this demo, we'll just generate new random data
            if (usageData) {
                setUsageData({
                    ...usageData,
                    dailyUsage: generateDailyUsageData(90),
                    errorRates: generateErrorRatesData(90),
                    responseTime: generateResponseTimeData(90)
                });
            }
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            setIsRefreshing(false);
        }
    };
    // Calculate total API calls for the selected period
    const calculateTotalCalls = (days: number) => {
        if (!usageData) return 0;
        const filteredData = getFilteredData(usageData.dailyUsage, days === 0 ? 0 : days);
        return filteredData.reduce((sum, day) => sum + day.calls, 0);
    };
    // Calculate total cost for the selected period (for pay-as-you-go models)
    const calculateTotalCost = (days: number) => {
        if (!usageData || usageData.billingPeriod !== BillingPeriod.PAY_AS_YOU_GO) return null;
        const filteredData = getFilteredData(usageData.dailyUsage, days === 0 ? 0 : days);
        return filteredData.reduce((sum, day) => sum + (day.cost || 0), 0);
    };
    // Map date range to number of days
    const dateRangeToDays = (range: '7d' | '30d' | '90d' | 'all'): number => {
        switch (range) {
            case '7d':
                return 7;
            case '30d':
                return 30;
            case '90d':
                return 90;
            case 'all':
                return 0;
        }
    };
    // Format number with thousand separators
    const formatNumber = (num: number): string => {
        return num.toLocaleString('fr-FR');
    };
    // Format date for display
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short'
        });
    };
    // Custom tooltip for charts
    const CustomTooltip = ({
        active,
        payload,
        label
    }: any) => {
        if (active && payload && payload.length) {
            return <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
                <p className="font-medium text-gray-800">{formatDate(label)}</p>
                {payload.map((entry: any, index: number) => <p key={index} style={{
                    color: entry.color
                }} className="text-sm">
                    {entry.name}: {entry.value.toLocaleString()}
                </p>)}
            </div>;
        }
        return null;
    };
    if (isLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>;
    }
    if (error || !usageData) {
        return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Statistiques non disponibles
            </h1>
            <p className="text-gray-600 mb-6">
                {error || "Les statistiques d'utilisation pour ce modèle ne sont pas disponibles."}
            </p>
            <button onClick={() => window.history.back()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Retour
            </button>
        </div>;
    }
    // Get filtered data based on selected date range
    const days = dateRangeToDays(dateRange);
    const filteredDailyUsage = getFilteredData(usageData.dailyUsage, days);
    const filteredErrorRates = getFilteredData(usageData.errorRates, days);
    const filteredResponseTime = getFilteredData(usageData.responseTime, days);
    // Calculate totals and trends
    const totalCalls = calculateTotalCalls(days);
    const totalCost = calculateTotalCost(days);
    // Calculate trend (comparing current period with previous period)
    const calculateTrend = (currentPeriod: number): number => {
        if (days === 0) return 0; // Not applicable for "all" time
        const previousPeriodData = usageData.dailyUsage.filter((item: { date: string | number | Date; }) => {
            const itemDate = new Date(item.date);
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - days);
            const previousCutoffDate = new Date();
            previousCutoffDate.setDate(previousCutoffDate.getDate() - 2 * days);
            return itemDate >= previousCutoffDate && itemDate < cutoffDate;
        });
        const previousPeriodTotal = previousPeriodData.reduce((sum: any, day: { calls: any; }) => sum + day.calls, 0);
        if (previousPeriodTotal === 0) return 100; // Avoid division by zero
        return (currentPeriod - previousPeriodTotal) / previousPeriodTotal * 100;
    };
    const trend = calculateTrend(totalCalls);


    return <div className="min-h-screen bg-gray-50">
        <UserDashboardHeader />
        <div className="flex">
            <UserDashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            <main className="flex-1 p-6">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex flex-wrap items-center justify-between mb-8">
                            <div className="flex items-center mb-4 md:mb-0">
                                <BarChart2 className="h-6 w-6 text-blue-600 mr-2" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Statistiques d'utilisation
                                    </h1>
                                    <p className="text-gray-600">
                                        {usageData.modelName} - {usageData.planName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center bg-gray-100 rounded-md">
                                    <button className={`px-3 py-1 text-sm rounded-md ${dateRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setDateRange('7d')}>
                                        7 jours
                                    </button>
                                    <button className={`px-3 py-1 text-sm rounded-md ${dateRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setDateRange('30d')}>
                                        30 jours
                                    </button>
                                    <button className={`px-3 py-1 text-sm rounded-md ${dateRange === '90d' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setDateRange('90d')}>
                                        90 jours
                                    </button>
                                    <button className={`px-3 py-1 text-sm rounded-md ${dateRange === 'all' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`} onClick={() => setDateRange('all')}>
                                        Tout
                                    </button>
                                </div>
                                <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200" onClick={handleRefresh} disabled={isRefreshing}>
                                    <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    Actualiser
                                </button>
                                <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                                    <Download className="h-4 w-4 mr-1.5" />
                                    Exporter
                                </button>
                            </div>
                        </div>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-blue-50 rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">
                                            Appels API totaux
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {formatNumber(totalCalls)}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Activity className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {trend !== 0 && <>
                                        {trend > 0 ? <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" /> : <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
                                        <span className={trend > 0 ? 'text-green-600' : 'text-red-600'}>
                                            {Math.abs(Math.round(trend))}%
                                        </span>
                                    </>}
                                    <span className="text-gray-500 text-sm ml-1">
                                        vs période précédente
                                    </span>
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-green-600 text-sm font-medium">
                                            Utilisation du quota
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {usageData.apiCallsLimit ? `${Math.round(usageData.apiCallsUsed / usageData.apiCallsLimit * 100)}%` : 'Illimité'}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Zap className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                {usageData.apiCallsLimit && <div className="mt-2">
                                    <div className="w-full bg-green-200 rounded-full h-2.5">
                                        <div className="bg-green-600 h-2.5 rounded-full" style={{
                                            width: `${Math.min(100, Math.round(usageData.apiCallsUsed / usageData.apiCallsLimit * 100))}%`
                                        }}></div>
                                    </div>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {formatNumber(usageData.apiCallsUsed)} sur{' '}
                                        {formatNumber(usageData.apiCallsLimit)}
                                    </p>
                                </div>}
                            </div>
                            <div className="bg-purple-50 rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-purple-600 text-sm font-medium">
                                            Temps de réponse moyen
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {Math.round(filteredResponseTime.reduce((sum, day) => sum + day.average, 0) / filteredResponseTime.length)}{' '}
                                            ms
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Clock className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    P95:{' '}
                                    {Math.round(filteredResponseTime.reduce((sum, day) => sum + day.p95, 0) / filteredResponseTime.length)}{' '}
                                    ms
                                </p>
                            </div>
                            {usageData.billingPeriod === BillingPeriod.PAY_AS_YOU_GO && totalCost !== null ? <div className="bg-yellow-50 rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-yellow-600 text-sm font-medium">
                                            Coût estimé
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {totalCost.toFixed(2)} {usageData.currency}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <DollarSign className="h-5 w-5 text-yellow-600" />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Période: {formatDate(filteredDailyUsage[0]?.date || '')} -{' '}
                                    {formatDate(filteredDailyUsage[filteredDailyUsage.length - 1]?.date || '')}
                                </p>
                            </div> : <div className="bg-gray-50 rounded-xl p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-gray-600 text-sm font-medium">
                                            Période d'abonnement
                                        </p>
                                        <h3 className="text-2xl font-bold mt-1">
                                            {usageData.billingPeriod === BillingPeriod.MONTHLY ? 'Mensuel' : usageData.billingPeriod === BillingPeriod.ANNUAL ? 'Annuel' : 'Pay-as-you-go'}
                                        </h3>
                                    </div>
                                    <div className="p-2 bg-gray-200 rounded-lg">
                                        <Calendar className="h-5 w-5 text-gray-600" />
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Prochain renouvellement: {formatDate(usageData.endDate)}
                                </p>
                            </div>}
                        </div>
                        {/* API Calls Chart */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Appels API
                                </h3>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Info className="h-4 w-4 mr-1" />
                                    <span>Nombre d'appels API par jour</span>
                                </div>
                            </div>
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={filteredDailyUsage}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                                            fontSize: 12
                                        }} tickMargin={10} />
                                        <YAxis tickFormatter={value => value.toLocaleString()} tick={{
                                            fontSize: 12
                                        }} width={60} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar dataKey="calls" name="Appels API" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        {/* Dual Charts: Error Rates and Response Time */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Taux d'erreur
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Info className="h-4 w-4 mr-1" />
                                        <span>Succès vs erreurs</span>
                                    </div>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={filteredErrorRates}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                                                fontSize: 12
                                            }} tickMargin={10} />
                                            <YAxis tickFormatter={value => value.toLocaleString()} tick={{
                                                fontSize: 12
                                            }} width={60} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend />
                                            <Line type="monotone" dataKey="success" name="Succès" stroke={COLORS.success} strokeWidth={2} dot={false} activeDot={{
                                                r: 6
                                            }} />
                                            <Line type="monotone" dataKey="clientError" name="Erreurs client" stroke={COLORS.warning} strokeWidth={2} dot={false} activeDot={{
                                                r: 6
                                            }} />
                                            <Line type="monotone" dataKey="serverError" name="Erreurs serveur" stroke={COLORS.danger} strokeWidth={2} dot={false} activeDot={{
                                                r: 6
                                            }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Temps de réponse
                                    </h3>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Info className="h-4 w-4 mr-1" />
                                        <span>Moyenne et P95 (ms)</span>
                                    </div>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={filteredResponseTime}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="date" tickFormatter={formatDate} tick={{
                                                fontSize: 12
                                            }} tickMargin={10} />
                                            <YAxis tick={{
                                                fontSize: 12
                                            }} width={40} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Legend />
                                            <Line type="monotone" dataKey="average" name="Moyenne" stroke={COLORS.primary} strokeWidth={2} dot={false} activeDot={{
                                                r: 6
                                            }} />
                                            <Line type="monotone" dataKey="p95" name="P95" stroke={COLORS.secondary} strokeWidth={2} dot={false} activeDot={{
                                                r: 6
                                            }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        {/* Endpoint Distribution */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Distribution des endpoints
                                </h3>
                                <div className="flex items-center text-sm text-gray-500">
                                    <Info className="h-4 w-4 mr-1" />
                                    <span>Répartition des appels par endpoint</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="h-64 flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={usageData.endpoints} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="calls" nameKey="name" label={({
                                                name,
                                                percent
                                            }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                                {usageData.endpoints.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={COLORS.pieColors[index % COLORS.pieColors.length]} />)}
                                            </Pie>
                                            <Tooltip formatter={value => formatNumber(Number(value))} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Endpoint
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Appels
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    %
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {usageData.endpoints.map((endpoint, index) => <tr key={index}>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    <div className="flex items-center">
                                                        <div className="w-3 h-3 rounded-full mr-2" style={{
                                                            backgroundColor: COLORS.pieColors[index % COLORS.pieColors.length]
                                                        }}></div>
                                                        {endpoint.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                    {formatNumber(endpoint.calls)}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                    {endpoint.percentage.toFixed(1)}%
                                                </td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl shadow-sm p-6">
                        <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                                <HelpCircle className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-blue-800 mb-2">
                                    Besoin d'aide avec vos statistiques ?
                                </h3>
                                <p className="text-blue-700 mb-4">
                                    Consultez notre documentation sur l'interprétation des
                                    statistiques d'utilisation ou contactez notre équipe de support
                                    pour toute question.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a href="/docs/usage-stats" className="inline-flex items-center px-4 py-2 bg-white border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50">
                                        Documentation
                                    </a>
                                    <a href="/contact" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        Contacter le support
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>;
}