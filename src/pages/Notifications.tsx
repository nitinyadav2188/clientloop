import React from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle2, Clock, Eye, AlertCircle, FileText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const { notifications, loading, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'missed_follow_up': return <Clock className="w-5 h-5 text-red-500" />;
      case 'proposal_viewed': return <Eye className="w-5 h-5 text-blue-500" />;
      case 'new_lead': return <Bell className="w-5 h-5 text-green-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.related_entity_id) {
      if (notification.type === 'missed_follow_up' || notification.type === 'new_lead') {
        navigate(`/app/leads/${notification.related_entity_id}`);
      } else if (notification.type === 'proposal_viewed') {
        navigate('/app/proposals');
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div>
            <Skeleton className="h-10 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Notifications</h1>
          <p className="text-muted-foreground font-medium">
            Stay updated with your latest alerts and activities.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-10">
        {notifications.length === 0 ? (
          <div className="bg-card border border-border p-12 rounded-xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg font-bold mb-1">No notifications yet</h3>
            <p className="text-muted-foreground">You're all caught up! New alerts will appear here.</p>
          </div>
        ) : (
          notifications.map(notification => (
            <Card 
              key={notification.id} 
              className={cn(
                "cursor-pointer transition-colors hover:bg-secondary/10",
                !notification.read ? "border-l-4 border-l-primary bg-primary/5" : "bg-card"
              )}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-4 sm:p-6 flex gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  !notification.read ? "bg-white border shadow-sm" : "bg-secondary"
                )}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-1">
                    <h4 className={cn("font-bold text-base", !notification.read ? "text-foreground" : "text-muted-foreground")}>
                      {notification.title}
                    </h4>
                    <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                      {format(parseISO(notification.created_at), 'MMM d, h:mm a')}
                    </span>
                  </div>
                  <p className={cn("text-sm", !notification.read ? "text-foreground" : "text-muted-foreground")}>
                    {notification.message}
                  </p>
                </div>
                {!notification.read && (
                  <div className="shrink-0 flex items-center">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
