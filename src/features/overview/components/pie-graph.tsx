'use client';

import { useMemo } from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--chart-3)' },
  { browser: 'edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'other', visitors: 190, fill: 'var(--chart-5)' }
];

const chartConfig = {
  visitors: {
    label: 'Visiteurs'
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)'
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)'
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)'
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)'
  },
  other: {
    label: 'Autres',
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Graphique circulaire - Donut avec texte</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Total des visiteurs par navigateur sur les 6 derniers mois
          </span>
          <span className='@[540px]/card:hidden'>Repartition des navigateurs</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {['chrome', 'safari', 'firefox', 'edge', 'other'].map(
                (browser, index) => (
                  <linearGradient
                    key={browser}
                    id={`fill${browser}`}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor={`var(--chart-${index + 1})`}
                      stopOpacity={1}
                    />
                    <stop
                      offset='100%'
                      stopColor={`var(--chart-${index + 1})`}
                      stopOpacity={0.8}
                    />
                  </linearGradient>
                )
              )}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: `url(#fill${item.browser})`
              }))}
              dataKey='visitors'
              nameKey='browser'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Total visiteurs
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          Chrome domine avec{' '}
          {((chartData[0].visitors / totalVisitors) * 100).toFixed(1)}%{' '}
          <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Base sur les donnees de Janvier a Juin 2024
        </div>
      </CardFooter>
    </Card>
  );
}
