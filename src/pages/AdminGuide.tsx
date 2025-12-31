import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdminRole } from '@/hooks/useAdminRole';
import {
  useGuideChapters,
  useCreateChapter,
  useUpdateChapter,
  useDeleteChapter,
  GuideChapter,
  GuideChapterInput,
} from '@/hooks/useGuideChapters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, GripVertical, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ChapterEditor from '@/components/admin/ChapterEditor';
import { Link } from 'react-router-dom';

const AdminGuide = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdminRole();
  const { data: chapters, isLoading: chaptersLoading } = useGuideChapters();
  const createChapter = useCreateChapter();
  const updateChapter = useUpdateChapter();
  const deleteChapter = useDeleteChapter();
  const { toast } = useToast();

  const [editingChapter, setEditingChapter] = useState<GuideChapter | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-center">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>You don't have permission to access this page.</p>
            <Link to="/">
              <Button className="mt-4">Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCreate = async (data: GuideChapterInput) => {
    try {
      await createChapter.mutateAsync(data);
      toast({ title: 'Chapter created successfully' });
      setIsCreating(false);
    } catch (error: any) {
      toast({
        title: 'Error creating chapter',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleUpdate = async (data: GuideChapterInput) => {
    if (!editingChapter) return;
    try {
      await updateChapter.mutateAsync({ id: editingChapter.id, ...data });
      toast({ title: 'Chapter updated successfully' });
      setEditingChapter(null);
    } catch (error: any) {
      toast({
        title: 'Error updating chapter',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteChapter.mutateAsync(deleteId);
      toast({ title: 'Chapter deleted successfully' });
      setDeleteId(null);
    } catch (error: any) {
      toast({
        title: 'Error deleting chapter',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isCreating || editingChapter) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <ChapterEditor
            chapter={editingChapter}
            onSave={editingChapter ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsCreating(false);
              setEditingChapter(null);
            }}
            isSaving={createChapter.isPending || updateChapter.isPending}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/guide">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-serif font-bold">Guide CMS</h1>
              <p className="text-muted-foreground">Manage your guide chapters</p>
            </div>
          </div>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Chapter
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Chapters ({chapters?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {chaptersLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading chapters...
              </div>
            ) : !chapters?.length ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No chapters yet.</p>
                <Button onClick={() => setIsCreating(true)} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create your first chapter
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-20">Order</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="w-24 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chapters.map((chapter) => (
                    <TableRow key={chapter.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                      <TableCell className="font-medium">{chapter.title}</TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {chapter.description}
                      </TableCell>
                      <TableCell>{chapter.sort_order}</TableCell>
                      <TableCell>
                        <Badge variant={chapter.is_free ? 'secondary' : 'default'}>
                          {chapter.is_free ? 'Free' : 'Premium'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingChapter(chapter)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeleteId(chapter.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Chapter</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this chapter? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AdminGuide;
