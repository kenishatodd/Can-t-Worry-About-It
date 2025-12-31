import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { GuideChapter, GuideChapterInput } from '@/hooks/useGuideChapters';

interface ChapterEditorProps {
  chapter?: GuideChapter | null;
  onSave: (data: GuideChapterInput) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const ChapterEditor = ({ chapter, onSave, onCancel, isSaving }: ChapterEditorProps) => {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [capacityResults, setCapacityResults] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (chapter) {
      setSlug(chapter.slug);
      setTitle(chapter.title);
      setDescription(chapter.description);
      setContent(chapter.content);
      setCapacityResults(chapter.capacity_results?.join(', ') || '');
      setIsFree(chapter.is_free);
      setSortOrder(chapter.sort_order);
    }
  }, [chapter]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      description,
      content,
      capacity_results: capacityResults
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      is_free: isFree,
      sort_order: sortOrder,
    });
  };

  const renderPreview = () => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-serif font-bold mt-6 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-serif font-semibold mt-5 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-semibold my-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4">{line.slice(2)}</li>;
      }
      if (line === '---') {
        return <hr key={index} className="my-6" />;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="my-2 text-muted-foreground">{line}</p>;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to chapters
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {showPreview ? (
        <Card>
          <CardHeader>
            <CardTitle>{title || 'Preview'}</CardTitle>
            <p className="text-muted-foreground">{description}</p>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            {renderPreview()}
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{chapter ? 'Edit Chapter' : 'New Chapter'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Chapter title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL-friendly ID)</Label>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Auto-generated from title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the chapter"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content (Markdown supported)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# Chapter Title

Write your chapter content here...

Use **bold** for emphasis.
Use - for bullet points.
Use --- for horizontal rules."
                  className="min-h-[400px] font-mono text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacityResults">Capacity Results (comma-separated)</Label>
                  <Input
                    id="capacityResults"
                    value={capacityResults}
                    onChange={(e) => setCapacityResults(e.target.value)}
                    placeholder="overflowing, steady, reserve"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="isFree"
                    checked={isFree}
                    onCheckedChange={setIsFree}
                  />
                  <Label htmlFor="isFree">Free chapter</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Chapter'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChapterEditor;
